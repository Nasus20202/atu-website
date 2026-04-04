<script lang="ts">
	let { children } = $props();
</script>

<li
	class="text-white/72 text-sm leading-relaxed pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-sky-300 before:font-bold"
>
	{@render children()}
</li>
