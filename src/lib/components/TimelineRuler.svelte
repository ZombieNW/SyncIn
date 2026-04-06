<script>
	let { totalFrames, fps, pixelsPerFrame, onmousedown } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex h-full flex-1 border-b border-zinc-700 bg-zinc-900" {onmousedown}>
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
