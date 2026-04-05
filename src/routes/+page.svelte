<script lang="ts">
	import ControlGrid from '$lib/components/ControlGrid.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import PropertiesPanel from '$lib/components/PropertiesPanel.svelte';

	let projectData = $state({
		name: 'Untitled Project',
		fps: 24,
		totalFrames: 24 * 10,
		tracks: {
			audio: [
				{
					startFrame: 8,
					frameLength: 48,
					label: 'Bee',
					wav: 'funny.wav'
				}
			],
			emotion: [
				{
					startFrame: 12,
					eyeSet: 'sex',
					mouthSet: 'fart'
				}
			],
			image: [
				{
					startFrame: 0,
					frameLength: 36,
					label: 'Happy',
					faceOpen: 12
				}
			]
		}
	});
	let selectedElement = $state(null);
</script>

<ControlGrid>
	{#snippet topLeft()}
		<PropertiesPanel bind:selectedElement bind:projectData />
	{/snippet}

	{#snippet topRight()}
		<h1>Video Playback</h1>
	{/snippet}

	{#snippet bottom()}
		<Timeline bind:selectedElement {projectData} />
	{/snippet}
</ControlGrid>
