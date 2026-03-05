import { spawnSync } from 'bun';

export function decodeAudio(file: string, sampleRate = 48000): Float32Array {
	const proc = spawnSync([
		'ffmpeg',
		// file
		'-i',
		file,
		// output
		'-f',
		'f32le',
		// mono
		'-ac',
		'1',
		// sample rate
		'-ar',
		String(sampleRate),
		// pipe
		'pipe:1',
	]);

	if (proc.exitCode !== 0) {
		throw new Error('ffmpeg failed to decode audio');
	}

	return new Float32Array(proc.stdout.buffer);
}
