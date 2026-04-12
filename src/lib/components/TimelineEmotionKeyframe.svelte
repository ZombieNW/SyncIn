<script lang="ts">
	interface Props {
		pixelsPerFrame: number;
		element: EditorTypes.EmotionTrackElement;
		projectTotalFrames: number;
		onClick?: (element: EditorTypes.EmotionTrackElement) => void;
	}

	let {
		pixelsPerFrame,
		element,
		onClick: onClickProp = () => {},
		projectTotalFrames
	}: Props = $props();

	let isDragging = $state(false);
	let startMouseX = $state(0);
	let initialStartFrame = $state(0);

	function handleMouseDown(e: MouseEvent) {
		// Prevent event from bubbling up to the Ruler/Timeline click handler
		e.stopPropagation();

		isDragging = true;
		startMouseX = e.clientX;
		initialStartFrame = element.startFrame;

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) return;
		const deltaX = e.clientX - startMouseX;
		const deltaFrames = Math.round(deltaX / pixelsPerFrame);
		const newFrame = initialStartFrame + deltaFrames;

		element.startFrame = Math.max(0, Math.min(projectTotalFrames, newFrame));
	}

	function handleMouseUp() {
		isDragging = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="absolute top-1/2 z-30 -translate-y-1/2 transform hover:cursor-pointer"
	style="left: {element.startFrame * pixelsPerFrame}px; transform: translateX(-50%);"
	onclick={() => onClickProp(element)}
	class:opacity-80={isDragging}
	onmousedown={handleMouseDown}
>
	<div
		class="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-emerald-700 bg-emerald-500"
	></div>
</div>
