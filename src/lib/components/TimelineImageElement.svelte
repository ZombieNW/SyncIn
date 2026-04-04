<script>
	// @ts-nocheck

	let { startFrame, pixelsPerFrame, frameLength, label } = $props();
</script>

<div class="relative flex h-full items-center">
	<div
		class="pointer-events-none absolute inset-y-1 rounded-lg bg-rose-600"
		style="
            left: {startFrame * pixelsPerFrame}px; 
            width: {frameLength * pixelsPerFrame}px;
        "
	>
		<h2 class="flex w-full items-center rounded-t-xl bg-rose-700 px-2">
			{label}
		</h2>
	</div>
</div>
