<script>
	import ControlGrid from '$lib/components/ControlGrid.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
</script>

<ControlGrid>
	{#snippet topLeft()}
		<h1>Properties</h1>
	{/snippet}

	{#snippet topRight()}
		<h1>Video Playback</h1>
	{/snippet}

	{#snippet bottom()}
		<Timeline />
	{/snippet}
</ControlGrid>
