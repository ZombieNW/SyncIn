<script>
	import ControlGrid from '$lib/components/ControlGrid.svelte';
</script>

<ControlGrid>
	{#snippet topLeft()}
		<h1>Properties</h1>
	{/snippet}

	{#snippet topRight()}
		<h1>Video Playback</h1>
	{/snippet}

	{#snippet bottom()}
		<h1>Editor</h1>
	{/snippet}
</ControlGrid>
