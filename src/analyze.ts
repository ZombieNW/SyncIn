import { decodeAudio } from './audio/decode';
import { generateVolumeFrames, normalize, smooth, round } from './audio/volume';

import type { Project } from './types';

export function analyzeAudio(
	file: string,
	fps: number = 24,
	sampleRate: number = 48000
): Project {
	const samples = decodeAudio(file, sampleRate);

	let frames = generateVolumeFrames(samples, sampleRate, fps);

	frames = normalize(frames);

	frames = smooth(frames);

	frames = round(frames);

	return { fps, frames };
}
