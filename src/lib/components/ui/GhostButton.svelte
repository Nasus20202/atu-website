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
	class="px-5 py-2.5 border border-primary/60 rounded text-primary text-sm font-medium backdrop-blur-sm hover:bg-primary/10 hover:border-primary transition-all cursor-pointer bg-transparent"
>
	{@render children()}
</button>
