<script>
	let { selectedElement } = $props();
</script>

<div class="p-2">
	{#if selectedElement}
		<pre>{JSON.stringify(selectedElement, null, 2)}</pre>
	{/if}
</div>
