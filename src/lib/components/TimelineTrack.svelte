<script>
	let { children } = $props();
</script>

<div class="flex w-full flex-1 border-b border-zinc-700">
	<div class="relative flex flex-1">
		{@render children?.()}
	</div>
</div>
