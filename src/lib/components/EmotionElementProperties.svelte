<script lang="ts">
	import PropertyField from './PropertyField.svelte';

	interface Props {
		element: EditorTypes.EmotionTrackElement;
	}

	let { element = $bindable() } = $props();
</script>

<h3 class="my-2 text-xs font-black tracking-wide text-zinc-400">Properties</h3>
<PropertyField label="Start Frame" bind:value={element.startFrame} />
<PropertyField label="Eye Set" bind:value={element.eyeSet} />
<PropertyField label="Mouth Set" bind:value={element.mouthSet} />
