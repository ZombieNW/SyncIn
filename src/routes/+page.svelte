<script lang="ts">
	import ControlGrid from '$lib/components/ControlGrid.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import PropertiesPanel from '$lib/components/PropertiesPanel.svelte';
	import VideoPlayback from '$lib/components/VideoPlayback.svelte';

	let currentFrame = $state(0);

	let projectData = $state({
		name: 'Untitled Project',
		fps: 24,
		resolution: { width: 512, height: 512 },
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
		<VideoPlayback {projectData} bind:currentFrame />
	{/snippet}

	{#snippet bottom()}
		<Timeline bind:selectedElement {projectData} bind:currentFrame />
	{/snippet}
</ControlGrid>
