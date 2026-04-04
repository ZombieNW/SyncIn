// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace EditorTypes {
		interface AudioTrackElement {
			startFrame: number;
			frameLength: number;
			label: string;
		}

		interface ImageTrackElement {
			startFrame: number;
			frameLength: number;
			label: string;
		}

		interface EmotionTrackElement {
			startFrame: number;
		}

		interface ProjectFile {
			name: string;
			fps: number;
			totalFrames: number;
			audiotracks: {
				audio: AudioTrackElement[];
				image: ImageTrackElement[];
				emotion: EmotionTrackElement[];
			}[];
		}
	}
}

export {};
