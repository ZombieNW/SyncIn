<script lang="ts">
	interface Props {
		label: string;
		value?: any;
	}

	let { label, value = $bindable() } = $props();
</script>

<div class="flex items-center gap-4">
	<h3 class="text-xs font-black tracking-wide text-zinc-400">{label.toUpperCase()}</h3>
	<input type="text" name={label} bind:value class="flex-1 outline-none" />
</div>
