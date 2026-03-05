import { fft } from 'fft-js';
import type { Frame } from '../types';

function bandEnergy(spectrum: number[], start: number, end: number) {
	let sum = 0;

	for (let i = start; i < end; i++) {
		sum += Math.abs(spectrum[i] ?? 0);
	}

	return sum / (end - start);
}

export function attachSpectrum(
	frames: Frame[],
	samples: Float32Array,
	sampleRate: number,
	fps: number
) {
	const samplesPerFrame = Math.floor(sampleRate / fps);

	frames.forEach((frame, index) => {
		const start = index * samplesPerFrame;

		const window = samples.slice(start, start + 1024);

		const phasors = fft(Array.from(window));
		const mags = phasors.map((p: number[]) => Math.abs(p[0] ?? 0));

		const low = bandEnergy(mags, 2, 10);
		const mid = bandEnergy(mags, 10, 40);
		const high = bandEnergy(mags, 40, 80);

		const total = low + mid + high || 1;

		frame.low = low / total;
		frame.mid = mid / total;
		frame.high = high / total;
	});

	return frames;
}
