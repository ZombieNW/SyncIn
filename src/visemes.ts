import type { Frame } from './types';

export function detectVisemes(frames: Frame[]): Frame[] {
	for (const f of frames) {
		const low = f.low ?? 0;
		const mid = f.mid ?? 0;
		const high = f.high ?? 0;

		if (f.volume < 0.05) {
			f.viseme = 'rest';
			continue;
		}

		if (high > 0.4) {
			f.viseme = 'teeth';
			continue;
		}

		if (mid > 0.45 && f.volume > 0.35) {
			f.viseme = 'open';
			continue;
		}

		if (mid > 0.32) {
			f.viseme = 'wide';
			continue;
		}

		if (low > 0.5) {
			f.viseme = 'closed';
			continue;
		}

		f.viseme = 'round';
	}

	return frames;
}
