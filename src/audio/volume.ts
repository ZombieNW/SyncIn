import type { Frame } from '../types';

// Root Mean Square
function rms(samples: Float32Array): number {
	let sum = 0;

	for (const s of samples) {
		sum += s * s;
	}

	return Math.sqrt(sum / samples.length);
}

export function generateVolumeFrames(
	samples: Float32Array,
	sampleRate: number,
	fps: number
): Frame[] {
	const samplesPerFrame = Math.floor(sampleRate / fps);
	const frames: Frame[] = [];

	for (let i = 0; i < samples.length; i += samplesPerFrame) {
		// get frames over that time
		const slice = samples.subarray(i, i + samplesPerFrame);

		// get the rms of those frames
		const volume = rms(slice);

		// add to frames
		frames.push({ volume: volume });
	}

	return frames;
}

export function normalize(frames: Frame[]): Frame[] {
	// get the max volume
	const max = Math.max(...frames.map((f) => f.volume), 0.0001);

	// normalize
	return frames.map((f) => ({ volume: f.volume / max }));
}

export function smooth(frames: Frame[], window = 2): Frame[] {
	return frames.map((f, i) => {
		let sum = 0;
		let count = 0;

		for (let j = -window; j <= window; j++) {
			const n = frames[i + j];
			if (!n) continue;

			sum += n.volume;
			count++;
		}

		return { volume: sum / count };
	});
}

export function round(frames: Frame[], precision = 4): void {
	for (const f of frames) {
		f.volume = Math.round(f.volume * 10 ** precision) / 10 ** precision;

		if (!f.high || !f.mid || !f.low) continue;
		f.high = Math.round(f.high * 10 ** precision) / 10 ** precision;
		f.mid = Math.round(f.mid * 10 ** precision) / 10 ** precision;
		f.low = Math.round(f.low * 10 ** precision) / 10 ** precision;
	}
}
