export const FACE_ASSETS = {
	mouth: {
		default: ['mouth_closed.png', 'mouth_small.png', 'mouth_medium.png', 'mouth_wide.png']
	},
	eyes: {
		default: ['eyes_open.png', 'eyes_closed.png']
	}
} as const;

export type AssetCategory = keyof typeof FACE_ASSETS;
export type AssetSet = keyof (typeof FACE_ASSETS)[AssetCategory];
