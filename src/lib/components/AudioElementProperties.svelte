<script lang="ts">
	import PropertyField from './PropertyField.svelte';

	interface Props {
		element: EditorTypes.AudioTrackElement;
	}

	let { element = $bindable() } = $props();
</script>

<h3 class="my-2 text-xs font-black tracking-wide text-zinc-400">Properties</h3>
<PropertyField label="Label" bind:value={element.label} />
<PropertyField label="Start Frame" bind:value={element.startFrame} type="number" />
<PropertyField label="Frame Length" bind:value={element.frameLength} type="number" />
<PropertyField label="Wav" bind:value={element.wav} />
