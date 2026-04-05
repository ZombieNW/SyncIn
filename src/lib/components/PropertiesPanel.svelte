<script lang="ts">
	import AudioElementProperties from './AudioElementProperties.svelte';
	import ImageElementProperties from './ImageElementProperties.svelte';
	import EmotionElementProperties from './EmotionElementProperties.svelte';
	import ProjectProperties from './ProjectProperties.svelte';

	interface Props {
		projectData: EditorTypes.ProjectFile;
		selectedElement:
			| EditorTypes.AudioTrackElement
			| EditorTypes.EmotionTrackElement
			| EditorTypes.ImageTrackElement;
	}

	let { selectedElement = $bindable(), projectData = $bindable() } = $props();

	let selectedTab = $state('project');
</script>

<div class="p-2">
	<div class="flex w-full gap-4">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="w-1/3 rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-0.5 hover:cursor-pointer hover:bg-zinc-800"
			class:bg-zinc-950={selectedTab == 'project'}
			onclick={() => (selectedTab = 'project')}
		>
			Project
		</div>
		{#if selectedElement}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="w-1/3 rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-0.5 hover:cursor-pointer hover:bg-zinc-800"
				class:bg-zinc-950={selectedTab == 'element'}
				onclick={() => (selectedTab = 'element')}
			>
				Element
			</div>
		{/if}
	</div>
	<div class="p-2">
		{#if selectedElement && selectedTab == 'element'}
			{#if selectedElement.wav}
				<AudioElementProperties bind:element={selectedElement} />
			{:else if selectedElement.faceOpen}
				<ImageElementProperties bind:element={selectedElement} />
			{:else if selectedElement.mouthSet}
				<EmotionElementProperties bind:element={selectedElement} />
			{/if}
		{:else}
			<ProjectProperties bind:projectData />
		{/if}
	</div>
</div>
