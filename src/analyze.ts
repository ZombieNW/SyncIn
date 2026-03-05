import { decodeAudio } from './audio/decode';
import { generateVolumeFrames, normalize, smooth, round } from './audio/volume';
import {
	detectSyllables,
	emphasizeSyllables,
	markSyllables,
} from './audio/syllables';
import { attachSpectrum } from './audio/spectrum';
import { detectVisemes } from './visemes';

import type { Project } from './types';
import { HighSensitivityProfile, StandardProfile } from './types';

export function analyzeAudio(
	file: string,
	fps: number = 24,
	sampleRate: number = 48000
): Project {
	const samples = decodeAudio(file, sampleRate);

	// Volume
	let frames = generateVolumeFrames(samples, sampleRate, fps);
	frames = normalize(frames);
	frames = smooth(frames);

	// Syllable detection
	const peaks = detectSyllables(frames);

	frames = emphasizeSyllables(frames, peaks);
	frames = markSyllables(frames, peaks);

	// Frequency
	frames = attachSpectrum(frames, samples, sampleRate, fps);

	// Visemes
	frames = detectVisemes(frames, StandardProfile);

	round(frames, 6);

	return { fps, frames };
}
