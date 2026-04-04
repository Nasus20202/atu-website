<script lang="ts">
	import SectionLink from '../SectionLink.svelte';

	let {
		href,
		external,
		underline,
		label
	}: { href: string; external?: boolean; underline?: boolean; label: string } = $props();
</script>

<SectionLink {href} {external} {underline}>{label}</SectionLink>
