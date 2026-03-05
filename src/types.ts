export type Frame = {
	volume: number;
	syllable?: boolean;
};

export type Project = {
	fps: number;
	frames: Frame[];
};
