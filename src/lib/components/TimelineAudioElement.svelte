<script lang="ts">
	interface Props {
		pixelsPerFrame: number;
		element: EditorTypes.AudioTrackElement;
		projectTotalFrames: number;
		onClick?: (element: EditorTypes.AudioTrackElement) => void;
		audio: HTMLAudioElement;
	}

	let {
		pixelsPerFrame,
		element,
		onClick: onClickProp = () => {},
		projectTotalFrames,
		audio
	}: Props = $props();

	// State for Dragging
	let isDragging = $state(false);
	let startMouseX = $state(0);
	let initialStartFrame = $state(0);

	// State for Waveform
	let canvasElement: HTMLCanvasElement | null = $state(null);
	let audioData: Float32Array | null = $state(null);
	let width = $derived(element.frameLength * pixelsPerFrame);

	// 1. Load and decode audio data
	$effect(() => {
		if (audio.src) {
			loadAudioBuffer(audio.src);
		}
	});

	// 2. Draw waveform whenever data, width, or canvas changes
	$effect(() => {
		if (audioData && canvasElement && width) {
			drawWaveform();
		}
	});

	async function loadAudioBuffer(url: string) {
		try {
			const response = await fetch(url);
			const arrayBuffer = await response.arrayBuffer();
			const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
			const decodedData = await audioCtx.decodeAudioData(arrayBuffer);
			// Use Channel 0 (Left/Mono)
			audioData = decodedData.getChannelData(0);
		} catch (err) {
			console.error('Error decoding audio for waveform:', err);
		}
	}

	function drawWaveform() {
		if (!canvasElement || !audioData) return;

		const ctx = canvasElement.getContext('2d');
		if (!ctx) return;

		// Set internal canvas resolution to match displayed size
		canvasElement.width = width;
		canvasElement.height = 100; // Fixed resolution for vertical detail

		const h = canvasElement.height;
		const mid = h / 2;

		ctx.clearRect(0, 0, width, h);
		ctx.fillStyle = '#818cf8'; // indigo-400

		// Determine how many audio samples fit into one pixel of width
		const samplesPerPixel = Math.floor(audioData.length / width);

		for (let i = 0; i < width; i++) {
			let min = 1.0;
			let max = -1.0;

			// Sample a block of audio for this specific pixel column
			for (let j = 0; j < samplesPerPixel; j++) {
				const val = audioData[i * samplesPerPixel + j];
				if (val < min) min = val;
				if (val > max) max = val;
			}

			// Draw vertical bar representing the amplitude range
			const rectY = (1 + min) * mid;
			const rectHeight = Math.max(1, (max - min) * mid);
			ctx.fillRect(i, rectY, 1, rectHeight);
		}
	}

	// Interaction Handlers
	function handleMouseDown(e: MouseEvent) {
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
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="absolute inset-y-1 overflow-hidden rounded-lg bg-indigo-600 transition-opacity hover:cursor-pointer"
		onclick={() => onClickProp(element)}
		onmousedown={handleMouseDown}
		class:opacity-80={isDragging}
		style="
            left: {element.startFrame * pixelsPerFrame}px; 
            width: {width}px;
            z-index: {isDragging ? 50 : 10};
        "
	>
		<h2
			class="relative z-10 flex w-full items-center bg-indigo-700/90 px-2 text-xs font-medium text-indigo-100"
		>
			{element.label}
		</h2>

		<canvas
			bind:this={canvasElement}
			class="pointer-events-none absolute inset-0 h-full w-full opacity-50"
		></canvas>
	</div>
</div>

<style>
	/* Ensure the canvas fills the container properly if Tailwind doesn't catch it */
	canvas {
		image-rendering: crisp-edges;
	}
</style>
