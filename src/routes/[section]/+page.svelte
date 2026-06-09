<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { scrollToSection, SECTION_IDS } from '$lib/sections';
	import AppShell from '$lib/components/AppShell.svelte';

	let { params } = $props();

	onMount(() => {
		if (params.section === 'atu') {
			goto('/', { replaceState: true });
		} else if ((SECTION_IDS as readonly string[]).includes(params.section)) {
			requestAnimationFrame(() => {
				scrollToSection(params.section);
			});
		}
	});
</script>

<AppShell />
