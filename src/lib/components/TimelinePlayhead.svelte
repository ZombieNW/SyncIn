<script>
	let { currentFrame, pixelsPerFrame } = $props();
</script>

<div
	class="pointer-events-none absolute top-0 bottom-0 z-30 w-px bg-rose-500"
	style="left: {currentFrame * pixelsPerFrame}px; transform: translateX(-50%);"
>
	<div class="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-rose-500"></div>
</div>
