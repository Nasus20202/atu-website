<script lang="ts">
	let { children } = $props();
</script>

<p class="text-primary text-xs font-semibold uppercase tracking-widest">
	{@render children()}
</p>
