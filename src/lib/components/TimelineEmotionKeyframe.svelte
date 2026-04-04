<script>
	let { startFrame, pixelsPerFrame } = $props();
</script>

<div
	class="pointer-events-none absolute top-1/2 z-30 -translate-y-1/2 transform"
	style="left: {startFrame * pixelsPerFrame}px; transform: translateX(-50%);"
>
	<div
		class="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-emerald-700 bg-emerald-500"
	></div>
</div>
