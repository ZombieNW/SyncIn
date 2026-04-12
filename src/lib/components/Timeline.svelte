<script>
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faClock, faFaceSmile, faHeart, faMusic } from '@fortawesome/free-solid-svg-icons'; // Video State
	import TimelineTrack from './TimelineTrack.svelte';
	import TimelineRuler from './TimelineRuler.svelte';
	import TimelinePlayhead from './TimelinePlayhead.svelte';
	import TimelineEmotionKeyframe from './TimelineEmotionKeyframe.svelte';
	import TimelineImageElement from './TimelineImageElement.svelte';
	import TimelineAudioElement from './TimelineAudioElement.svelte';

	let currentFrame = $state(0);
	let fps = $state(24);
	let pixelsPerFrame = $state(5); // Playhead Controls

	// @ts-ignore
	let { selectedElement = $bindable(null), projectData } = $props();

	// @ts-ignore
	function selectElement(object) {
		selectedElement = object;
	}

	let isDragging = $state(false);
	let timelineContainer = $state();

	// @ts-ignore
	function updateFrameFromClick(e) {
		if (!timelineContainer) return;
		const rect = timelineContainer.getBoundingClientRect(); // scrollLeft is added to account for how far the user has scrolled
		const offsetX = e.clientX - rect.left + timelineContainer.scrollLeft;

		const frame = Math.round(offsetX / pixelsPerFrame);
		currentFrame = Math.max(0, Math.min(projectData.totalFrames, frame));
	}

	// @ts-ignore
	function handleMouseDown(e) {
		e.preventDefault();

		isDragging = true;
		updateFrameFromClick(e); // Attach window listeners so dragging doesn't stop if mouse leaves the element

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

<div
	class="flex h-full w-full flex-col overflow-hidden bg-zinc-950 font-mono select-none"
	onwheel={handleWheel}
>
	<div class="relative flex flex-1 overflow-hidden">
		<div class="mb-4 flex w-20 flex-col border-r border-zinc-800 bg-zinc-900">
			{#each [faClock, faHeart, faFaceSmile, faMusic] as icon}
				<div class="flex flex-1 items-center justify-center border-b border-zinc-700 text-zinc-400">
					<FontAwesomeIcon {icon} />
				</div>
			{/each}
		</div>
		<div
			class="flex min-w-0 flex-1 flex-col overflow-x-scroll overflow-y-hidden"
			bind:this={timelineContainer}
		>
			<div class="relative flex h-full min-w-fit flex-col">
				<TimelineTrack>
					<TimelineRuler {projectData} {pixelsPerFrame} onmousedown={handleMouseDown} />
				</TimelineTrack>

				<TimelineTrack>
					{#each projectData.tracks.emotion as element}
						<TimelineEmotionKeyframe
							{element}
							{pixelsPerFrame}
							onClick={selectElement}
							projectTotalFrames={projectData.totalFrames}
						/>
					{/each}
				</TimelineTrack>

				<TimelineTrack>
					{#each projectData.tracks.image as element}
						<TimelineImageElement
							{element}
							{pixelsPerFrame}
							onClick={selectElement}
							projectTotalFrames={projectData.totalFrames}
						/>
					{/each}
				</TimelineTrack>

				<TimelineTrack>
					{#each projectData.tracks.audio as element}
						<TimelineAudioElement
							{element}
							{pixelsPerFrame}
							onClick={selectElement}
							projectTotalFrames={projectData.totalFrames}
						/>
					{/each}
				</TimelineTrack>

				<TimelinePlayhead {currentFrame} {pixelsPerFrame} />
			</div>
		</div>
	</div>
</div>
