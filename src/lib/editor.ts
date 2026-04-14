export function getElementsAtFrame(
	project: EditorTypes.ProjectFile,
	frame: number
): EditorTypes.ActiveElements {
	const { audio, image, emotion } = project.tracks;

	// find audio elements
	const activeAudio = audio.filter(
		(item) => frame >= item.startFrame && frame < item.startFrame + item.frameLength
	);

	// find image elements
	const activeImage = image.filter(
		(item) => frame >= item.startFrame && frame < item.startFrame + item.frameLength
	);

	// Find the most recent emotion state
	const currentEmotion = emotion
		.filter((item) => item.startFrame <= frame)
		.reduce<EditorTypes.EmotionTrackElement | null>((prev, curr) => {
			if (!prev || curr.startFrame > prev.startFrame) {
				return curr;
			}
			return prev;
		}, null);

	// return found items
	return {
		audio: activeAudio,
		image: activeImage,
		currentEmotion
	};
}
