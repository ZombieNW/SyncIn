export type Viseme = 'rest' | 'open' | 'wide' | 'round' | 'closed' | 'teeth';

export interface Frame {
	volume: number;

	low?: number;
	mid?: number;
	high?: number;

	syllable?: boolean;

	viseme?: Viseme;
}

export type Project = {
	fps: number;
	frames: Frame[];
};
