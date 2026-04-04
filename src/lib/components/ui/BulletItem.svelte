<script lang="ts">
	let { children } = $props();
</script>

<li
	class="text-text-muted text-sm leading-relaxed pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-primary before:font-bold"
>
	{@render children()}
</li>
