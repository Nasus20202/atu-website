<script lang="ts">
	let {
		onclick,
		children,
		type = 'button'
	}: {
		onclick?: () => void;
		children: any;
		type?: 'button' | 'submit';
	} = $props();
</script>

<button
	{type}
	{onclick}
	class="px-5 py-2.5 border border-white/40 rounded text-white text-sm font-medium backdrop-blur-sm hover:bg-white/15 hover:border-white transition-all cursor-pointer bg-transparent"
>
	{@render children()}
</button>
