import type { Frame } from '../types';

export function detectSyllables(frames: Frame[]): number[] {
	const peaks: number[] = [];

	for (let i = 1; i < frames.length - 1; i++) {
		const prev = frames[i - 1];
		const curr = frames[i];
		const next = frames[i + 1];

		if (!prev || !curr || !next) continue;

		if (
			curr.volume > prev.volume &&
			curr.volume > next.volume &&
			curr.volume > 0.15
		) {
			const lastPeak = peaks[peaks.length - 1];
			if (lastPeak === undefined || i - lastPeak > 2) {
				peaks.push(i);
			}
		}
	}

	console.log('syllables:', peaks.length);
	return peaks;
}

export function markSyllables(frames: Frame[], peaks: number[]): Frame[] {
	for (const index of peaks) {
		const frame = frames[index];
		if (!frame) continue;
		frame.syllable = true;
	}

	return frames;
}

export function emphasizeSyllables(frames: Frame[], peaks: number[]): Frame[] {
	for (const p of peaks) {
		for (let i = -2; i <= 2; i++) {
			const f = frames[p + i];
			if (!f) continue;

			const weight = 1 - Math.abs(i) * 0.3;
			f.volume = Math.min(1, f.volume * (1 + weight * 0.5));
		}
	}

	return frames;
}
