import { getElementsAtFrame } from '$lib/editor';
import { FACE_ASSETS, type AssetCategory } from './assets';

const imageCache = new Map<string, HTMLImageElement>();

export async function drawFrameLayers(
	ctx: CanvasRenderingContext2D,
	projectData: EditorTypes.ProjectFile,
	currentFrame: number
) {
	const elements = getElementsAtFrame(projectData, currentFrame);
	const { width, height } = projectData.resolution;

	try {
		// make sure we have applicable data
		if (!elements.image) return;
		if (!elements.currentEmotion) return;

		// get assets
		const [mouth, eyes] = await Promise.all([
			getFacePart('mouth', elements.currentEmotion.mouthSet, elements.image.faceOpen),
			getFacePart('eyes', elements.currentEmotion.eyeSet, 0)
		]);

		// draw
		ctx.drawImage(mouth, 0, 0, width, height);
		ctx.drawImage(eyes, 0, 0, width, height);
	} catch (err) {
		console.error('Animation render failed:', err);
	}
}

export async function loadImage(path: string): Promise<HTMLImageElement> {
	if (imageCache.has(path)) return imageCache.get(path)!;

	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = path;
		img.onload = () => {
			imageCache.set(path, img);
			resolve(img);
		};
		img.onerror = () => reject(new Error(`Failed to load: ${path}`));
	});
}

export async function getFacePart(
	category: AssetCategory,
	set: string,
	index: number
): Promise<HTMLImageElement> {
	const assetSet = (FACE_ASSETS[category] as unknown as Record<string, string[]>)[set];

	if (!assetSet || !assetSet[index]) {
		throw new Error(`Asset not found: ${category}/${set}/${index}`);
	}

	const path = `/assets/${category}/${set}/${assetSet[index]}`;
	return loadImage(path);
}
