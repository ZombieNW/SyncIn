<script lang="ts">
	interface Props {
		label: string;
		value?: any;
		type?: 'text' | 'number';
	}

	let { label, value = $bindable(), type = 'text' } = $props();
</script>

<div class="flex items-center gap-4">
	<h3 class="text-xs font-black tracking-wide text-zinc-400">{label.toUpperCase()}</h3>
	<input {type} name={label} bind:value class="flex-1 outline-none" />
</div>
