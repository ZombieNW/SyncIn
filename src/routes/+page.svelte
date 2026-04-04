<script lang="ts">
	import ControlGrid from '$lib/components/ControlGrid.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import PropertiesPanel from '$lib/components/PropertiesPanel.svelte';

	let selectedElement = $state(null);
</script>

<ControlGrid>
	{#snippet topLeft()}
		<PropertiesPanel {selectedElement} />
	{/snippet}

	{#snippet topRight()}
		<h1>Video Playback</h1>
	{/snippet}

	{#snippet bottom()}
		<Timeline bind:selectedElement />
	{/snippet}
</ControlGrid>
