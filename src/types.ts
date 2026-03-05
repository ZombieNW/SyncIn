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

export type VisemeProfile = {
	name: string;
	thresholds: {
		silence: number; // Below this volume, use 'rest'
		sibilance: number; // Threshold for 'teeth' (high freq)
		open: number; // Threshold for 'open' (mid freq + volume)
		wide: number; // Threshold for 'wide' (mid freq)
		closed: number; // Threshold for 'closed' (low freq dominance)
	};
	weights: {
		low: number;
		mid: number;
		high: number;
	};
};

export const StandardProfile: VisemeProfile = {
	name: 'standard',
	thresholds: {
		silence: 0.05,
		sibilance: 0.25,
		open: 0.45,
		wide: 0.32,
		closed: 0.75,
	},
	weights: {
		low: 1.0,
		mid: 1.2,
		high: 1.0,
	},
};

export const HighSensitivityProfile: VisemeProfile = {
	name: 'high-sensitivity',
	thresholds: {
		silence: 0.03,
		sibilance: 0.2,
		open: 0.35,
		wide: 0.25,
		closed: 0.85, // Harder to trigger 'closed'
	},
	weights: {
		low: 0.8,
		mid: 1.5,
		high: 1.2,
	},
};
