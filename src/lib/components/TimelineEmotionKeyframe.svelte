<script lang="ts">
	interface Props {
		pixelsPerFrame: number;
		element: EditorTypes.EmotionTrackElement;
		onClick?: (element: EditorTypes.EmotionTrackElement) => void;
	}

	let { pixelsPerFrame, element, onClick: onClickProp = () => {} }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="absolute top-1/2 z-30 -translate-y-1/2 transform hover:cursor-pointer"
	style="left: {element.startFrame * pixelsPerFrame}px; transform: translateX(-50%);"
	onclick={() => onClickProp(element)}
>
	<div
		class="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-emerald-700 bg-emerald-500"
	></div>
</div>
