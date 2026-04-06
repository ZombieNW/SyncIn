<script lang="ts">
	interface Props {
		pixelsPerFrame: number;
		element: EditorTypes.ImageTrackElement;
		onClick?: (element: EditorTypes.AudioTrackElement) => void;
	}

	let { pixelsPerFrame, element, onClick: onClickProp = () => {} }: Props = $props();
</script>

<div class="relative flex h-full items-center">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="absolute inset-y-1 rounded-lg bg-indigo-600 hover:cursor-pointer"
		onclick={() => onClickProp(element)}
		style="
            left: {element.startFrame * pixelsPerFrame}px; 
            width: {element.frameLength * pixelsPerFrame}px;
        "
	>
		<h2 class="flex w-full items-center rounded-t-xl bg-indigo-700 px-2">
			{element.label}
		</h2>
	</div>
</div>
