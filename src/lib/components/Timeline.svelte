<script>
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faClock, faFaceSmile, faHeart, faMusic } from '@fortawesome/free-solid-svg-icons';

	// Video State
	let currentFrame = $state(0);
	let fps = $state(24);
	let durationSeconds = $state(10);
	let totalFrames = $derived(durationSeconds * fps);
	let pixelsPerFrame = $state(5);

	// Playhead Controls
	let isDragging = $state(false);
	let timelineContainer = $state();

	// @ts-ignore
	function updateFrameFromClick(e) {
		if (!timelineContainer) return;
		const rect = timelineContainer.getBoundingClientRect();
		// scrollLeft is added to account for how far the user has scrolled
		const x = e.clientX - rect.left + timelineContainer.scrollLeft;

		let frame = Math.round(x / pixelsPerFrame);
		currentFrame = Math.max(0, Math.min(totalFrames, frame));
	}

	// @ts-ignore
	function handleMouseDown(e) {
		isDragging = true;
		updateFrameFromClick(e);

		// Attach window listeners so dragging doesn't stop if mouse leaves the element
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}

	// @ts-ignore
	function handleMouseMove(e) {
		if (isDragging) {
			updateFrameFromClick(e);
		}
	}

	function handleMouseUp() {
		isDragging = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}

	// @ts-ignore
	function handleWheel(e) {
		if (e.ctrlKey) {
			e.preventDefault();
			const zoomSpeed = 0.5;
			const newScale = pixelsPerFrame - (e.deltaY > 0 ? zoomSpeed : -zoomSpeed);
			pixelsPerFrame = Math.max(2, Math.min(100, newScale));
		} else {
			// Scroll horizontally when Ctrl is NOT pressed
			e.preventDefault();
			timelineContainer.scrollLeft += e.deltaY;
		}
	}
</script>

<div class="flex h-full w-full overflow-hidden font-mono select-none" onwheel={handleWheel}>
	<div class="mb-4 flex w-20 flex-col border-r border-zinc-800 bg-zinc-900">
		{#each [faClock, faHeart, faFaceSmile, faMusic] as icon}
			<div class="flex flex-1 items-center justify-center border-b border-zinc-700 text-zinc-400">
				<FontAwesomeIcon {icon} />
			</div>
		{/each}
	</div>
	<div
		class="relative flex flex-1 flex-col overflow-x-scroll overflow-y-hidden bg-zinc-900/20"
		bind:this={timelineContainer}
	>
		<div class="relative flex w-fit min-w-full flex-1 flex-col">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="flex flex-1 border-b border-zinc-700" onmousedown={handleMouseDown}>
				{#each Array(totalFrames + 1) as _, i}
					<div
						class:h-full={i % fps === 0}
						class:border-zinc-500={i % fps === 0}
						class:mt-auto={i % fps !== 0}
						class:h-8={i % fps !== 0}
						class:border-zinc-800={i % fps !== 0}
						class="shrink-0 border-l"
						style="width: {pixelsPerFrame}px"
					>
						{#if i % fps === 0}
							<span class="pl-1 text-sm text-zinc-400">{i / fps}s</span>
						{/if}
					</div>
				{/each}
			</div>

			<div class="flex flex-1 border-b border-zinc-700"></div>
			<div class="flex flex-1 border-b border-zinc-700"></div>
			<div class="flex flex-1 border-b border-zinc-700"></div>

			<div
				class="pointer-events-none absolute top-0 bottom-0 z-30 w-px bg-rose-500"
				style="left: {currentFrame * pixelsPerFrame}px"
			>
				<div class="absolute -top-1 -left-1.5 h-3 w-3 rotate-45 bg-rose-500"></div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Custom scrollbar to match Zinc theme */
	div::-webkit-scrollbar {
		height: auto;
	}
	div::-webkit-scrollbar-track {
		background: #18181b;
	}
	div::-webkit-scrollbar-thumb {
		background: #3f3f46;
		border-radius: 4px;
	}
	div::-webkit-scrollbar-thumb:hover {
		background: #52525b;
	}
</style>
