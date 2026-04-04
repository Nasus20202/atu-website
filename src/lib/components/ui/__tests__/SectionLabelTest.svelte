<script lang="ts">
	import SectionLabel from '../SectionLabel.svelte';
	let { label }: { label: string } = $props();
</script>

<SectionLabel>{label}</SectionLabel>
