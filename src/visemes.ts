import { StandardProfile, type Frame, type VisemeProfile } from './types';

export function detectVisemes(
	frames: Frame[],
	profile: VisemeProfile = StandardProfile
): Frame[] {
	for (const f of frames) {
		// weight to normalize sensitivity
		const low = (f.low ?? 0) * profile.weights.low;
		const mid = (f.mid ?? 0) * profile.weights.mid;
		const high = (f.high ?? 0) * profile.weights.high;
		const vol = f.volume ?? 0;

		// silence
		if (vol < profile.thresholds.silence) {
			f.viseme = 'rest';
			continue;
		}

		// teeth
		if (high > profile.thresholds.sibilance && high > mid) {
			f.viseme = 'teeth';
			continue;
		}

		// open/wide
		if (mid > profile.thresholds.open && vol > 0.4) {
			f.viseme = 'open';
			continue;
		}

		if (mid > profile.thresholds.wide) {
			f.viseme = 'wide';
			continue;
		}

		// closed/round/wide
		if (low > profile.thresholds.closed) {
			f.viseme = 'closed';
		} else if (low > mid) {
			f.viseme = 'round';
		} else {
			f.viseme = 'wide';
		}
	}

	return frames;
}
