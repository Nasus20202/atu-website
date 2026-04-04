<script lang="ts">
	let { children } = $props();
</script>

<p class="text-sky-300 text-xs font-semibold uppercase tracking-widest">
	{@render children()}
</p>
