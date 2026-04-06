<script lang="ts">
	let { topLeft, topRight, bottom } = $props();

	// Split ratio (%)
	let verticalSplit = $state(50);
	let horizontalSplit = $state(50);

	let activeResizer = $state<'vertical' | 'horizontal' | null>(null);

	function startResizing(type: 'vertical' | 'horizontal') {
		activeResizer = type;
	}

	function stopResizing() {
		activeResizer = null;
	}

	function onMouseMove(e: MouseEvent) {
		if (!activeResizer) return;

		if (activeResizer === 'vertical') {
			const newHeight = (e.clientY / window.innerHeight) * 100;
			if (newHeight > 20 && newHeight < 80) verticalSplit = newHeight;
		} else {
			const newWidth = (e.clientX / window.innerWidth) * 100;
			if (newWidth > 10 && newWidth < 90) horizontalSplit = newWidth;
		}
	}
</script>

<svelte:window onmousemove={onMouseMove} onmouseup={stopResizing} />

<div class="flex h-screen w-full flex-col overflow-hidden bg-zinc-950 text-zinc-200">
	<div style="height: {verticalSplit}%" class="flex w-full">
		<div style="width: {horizontalSplit}%" class="h-full overflow-auto">
			{@render topLeft?.()}
		</div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			onmousedown={() => startResizing('horizontal')}
			class="w-1 cursor-col-resize bg-zinc-800 transition-colors hover:bg-zinc-600"
		></div>

		<div style="width: {100 - horizontalSplit}%" class="h-full overflow-auto">
			{@render topRight?.()}
		</div>
	</div>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		onmousedown={() => startResizing('vertical')}
		class="h-1 cursor-row-resize bg-zinc-800 transition-colors hover:bg-zinc-600"
	></div>

	<div style="height: {100 - verticalSplit}%" class="w-full overflow-auto">
		{@render bottom?.()}
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		user-select: none;
	}
</style>
