<script lang="ts">
	import PropertyField from './PropertyField.svelte';

	interface Props {
		projectData: EditorTypes.ProjectFile;
	}

	let { projectData = $bindable() } = $props();
</script>

<h3 class="my-2 text-xs font-black tracking-wide text-zinc-400">Properties</h3>
<PropertyField label="Name" bind:value={projectData.name} />
<PropertyField label="FPS" bind:value={projectData.fps} type="number" />
<PropertyField label="Total Frames" bind:value={projectData.totalFrames} type="number" />
