<script lang="ts">
	interface Props {
		label: string;
		audio: HTMLAudioElement | undefined;
	}

	let { label, audio = $bindable() }: Props = $props();

	// Internal state for the file input
	let fileList = $state<FileList | undefined>();
	let currentUrl = $state<string | null>(null);

	$effect(() => {
		if (fileList && fileList.length > 0) {
			const file = fileList[0];
			const newUrl = URL.createObjectURL(file);

			// Update the bound audio prop with a new instance
			audio = new Audio(newUrl);
			currentUrl = newUrl;
		}

		// Cleanup: Runs before the next file selection or component unmount
		return () => {
			if (currentUrl) {
				URL.revokeObjectURL(currentUrl);
				currentUrl = null;
			}
		};
	});
</script>

<div class="flex flex-col items-center gap-4">
	<h3 class="text-xs font-black tracking-wide text-zinc-400">{label.toUpperCase()}</h3>
	<div class="flex w-full items-center gap-2">
		<h3 class="text-xs font-black tracking-wide text-zinc-400">FILE</h3>
		<input
			type="file"
			accept="audio/*"
			name={label}
			bind:files={fileList}
			class="flex-1 cursor-pointer rounded-sm border border-zinc-700 bg-zinc-700/50 text-xs outline-none file:rounded-sm file:border-0 file:bg-zinc-600 file:px-2 file:py-1 file:text-xs file:font-semibold file:text-zinc-100 hover:file:bg-zinc-500"
		/>
	</div>

	{#if currentUrl}
		<div class="mt-2 w-full">
			<audio controls src={currentUrl} class="h-8 w-full"></audio>
		</div>
	{/if}
</div>
