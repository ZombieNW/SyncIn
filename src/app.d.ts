// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace EditorTypes {
		interface AudioTrackElement {
			wav: string;
			startFrame: number;
			frameLength: number;
			label: string;
		}

		interface ImageTrackElement {
			faceOpen: number;
			startFrame: number;
			frameLength: number;
			label: string;
		}

		interface EmotionTrackElement {
			startFrame: number;
			eyeSet: string;
			mouthSet: string;
		}

		interface ProjectFile {
			name: string;
			fps: number;
			totalFrames: number;
			resolution: {
				width: number;
				height: number;
			};
			tracks: {
				audio: AudioTrackElement[];
				image: ImageTrackElement[];
				emotion: EmotionTrackElement[];
			};
		}
	}
}

export {};
