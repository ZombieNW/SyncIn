<script>
	let { projectData, pixelsPerFrame, onmousedown } = $props();

	let frames = $derived(Array.from({ length: projectData.totalFrames + 1 }));
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex h-full flex-1 border-b border-zinc-700 bg-zinc-900" {onmousedown}>
	{#key projectData.totalFrames}
		{#each frames as _, i}
			<div
				class:h-full={i % projectData.fps === 0}
				class:border-zinc-500={i % projectData.fps === 0}
				class:mt-auto={i % projectData.fps !== 0}
				class:h-8={i % projectData.fps !== 0}
				class:border-zinc-800={i % projectData.fps !== 0}
				class="shrink-0 border-l"
				style="width: {pixelsPerFrame}px"
			>
				{#if i % projectData.fps === 0}
					<span class="pl-1 text-sm text-zinc-400">{i / projectData.fps}s</span>
				{/if}
			</div>
		{/each}
	{/key}
</div>
