<script lang="ts">
	import {
		faPlay,
		faPause,
		faForwardFast,
		faBackwardFast,
		faForwardStep,
		faBackwardStep
	} from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	let {
		projectData,
		currentFrame = $bindable(0)
	}: { projectData: EditorTypes.ProjectFile; currentFrame: number } = $props();

	// playback
	let isPlaying = $state<boolean>(false);
	let canvasElement = $state<HTMLCanvasElement>();

	// timing
	let lastFrameTime = 0;
	const frameInterval = $derived(1000 / projectData.fps);
	const maxFrame = $derived(projectData.totalFrames - 1);

	// animation update frame
	function updateCanvas() {
		if (!canvasElement) return;
		const ctx = canvasElement.getContext('2d');
		if (!ctx) return;

		const { width, height } = projectData.resolution;

		ctx.fillStyle = '#e7e7e7';
		ctx.fillRect(0, 0, width, height);
		drawFrameLayers(ctx);
	}

	// face animation logic
	function drawFrameLayers(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#333';
		ctx.font = '16px sans-serif';
		ctx.textAlign = 'center';

		const centerX = projectData.resolution.width / 2;
		ctx.fillText(`Frame: ${currentFrame}`, centerX, 40);
	}

	function togglePlay(): void {
		isPlaying = !isPlaying;
		if (isPlaying) {
			lastFrameTime = performance.now();
			requestAnimationFrame(playLoop);
		}
	}

	function playLoop(timestamp: number): void {
		if (!isPlaying) return;

		const elapsed = timestamp - lastFrameTime;

		if (elapsed >= frameInterval) {
			lastFrameTime = timestamp - (elapsed % frameInterval);

			if (currentFrame < maxFrame) {
				currentFrame++;
			} else {
				isPlaying = false;
				return;
			}
		}
		requestAnimationFrame(playLoop);
	}

	// Navigation
	const stepForward = () => {
		if (currentFrame < maxFrame) currentFrame++;
	};
	const stepBackward = () => {
		if (currentFrame > 0) currentFrame--;
	};
	const jumpToStart = () => {
		currentFrame = 0;
	};
	const jumpToEnd = () => {
		currentFrame = maxFrame;
	};

	$effect(() => {
		updateCanvas();
	});
</script>

<div class="flex h-full flex-col overflow-hidden select-none">
	<!-- Canvas Preview -->
	<div class="flex grow items-center justify-center overflow-hidden p-3">
		<div
			class="relative shadow-2xl"
			style="aspect-ratio: {projectData.resolution.width} / {projectData.resolution
				.height}; max-height: 100%; max-width: 100%;"
		>
			<canvas
				bind:this={canvasElement}
				width={projectData.resolution.width}
				height={projectData.resolution.height}
				class="block h-full w-full object-contain shadow-inner"
			></canvas>
		</div>
	</div>
	<!-- Control Bar -->
	<div class="flex items-center justify-center bg-zinc-900 px-4 py-2">
		<!-- Playback Indicator -->
		<div class="flex w-1/12 items-center justify-start">
			<span
				class="h-2 w-2 rounded-full {isPlaying ? 'animate-pulse bg-emerald-500' : 'bg-zinc-600'}"
			></span>
		</div>

		<!-- Control Panel -->
		<div class="flex grow items-center justify-center gap-1">
			<button onclick={jumpToStart} class="transport-btn" title="First Frame">
				<FontAwesomeIcon icon={faBackwardFast} />
			</button>
			<button onclick={stepBackward} class="transport-btn" title="Step Back">
				<FontAwesomeIcon icon={faBackwardStep} />
			</button>
			<button onclick={togglePlay} class="transport-btn" title={isPlaying ? 'Pause' : 'Play'}>
				<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
			</button>
			<button onclick={stepForward} class="transport-btn" title="Step Forward">
				<FontAwesomeIcon icon={faForwardStep} />
			</button>
			<button onclick={jumpToEnd} class="transport-btn" title="Last Frame">
				<FontAwesomeIcon icon={faForwardFast} />
			</button>
		</div>
		<!-- Frame Counter -->
		<div class="flex w-1/12 items-center justify-end">
			<span class="rounded bg-black/30 px-2 py-0.5 font-mono text-xs text-indigo-400">
				{currentFrame.toString().padStart(5, '0')}
			</span>
		</div>
	</div>
</div>

<style>
	@reference "../../routes/layout.css";

	@layer base {
		.transport-btn {
			@apply flex h-6 w-8 items-center justify-center rounded bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950;
		}
	}
</style>
