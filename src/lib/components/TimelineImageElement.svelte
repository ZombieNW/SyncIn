<script lang="ts">
	interface Props {
		pixelsPerFrame: number;
		// Using $bindable so changes here reflect in the parent projectData
		element: EditorTypes.ImageTrackElement & { startFrame: number };
		projectTotalFrames: number;
		onClick?: (element: any) => void;
	}

	let {
		pixelsPerFrame,
		element = $bindable(),
		onClick = () => {},
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
		const maxFrame = projectTotalFrames - element.frameLength;
		const newFrame = initialStartFrame + deltaFrames;

		element.startFrame = Math.max(0, Math.min(maxFrame, newFrame));
	}

	function handleMouseUp() {
		isDragging = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}
</script>

<div class="relative flex h-full items-center">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="absolute inset-y-1 rounded-lg bg-rose-600 hover:cursor-grab active:cursor-grabbing"
		class:opacity-80={isDragging}
		onmousedown={handleMouseDown}
		onclick={() => onClick(element)}
		style="
            left: {element.startFrame * pixelsPerFrame}px; 
            width: {element.frameLength * pixelsPerFrame}px;
            z-index: {isDragging ? 50 : 10};
        "
	>
		<h2 class="flex w-full items-center rounded-t-xl bg-rose-700 px-2">
			{element.label}
		</h2>
	</div>
</div>
