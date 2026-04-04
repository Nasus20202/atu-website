<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronUp, ChevronDown } from 'lucide-svelte';
	import { SECTION_IDS, scrollToSection, createSectionObserver } from '$lib/sections';

	let activeIndex = $state(0);

	onMount(() => {
		return createSectionObserver((id) => {
			const idx = SECTION_IDS.indexOf(id as (typeof SECTION_IDS)[number]);
			if (idx !== -1) activeIndex = idx;
		});
	});

	function go(idx: number) {
		const id = SECTION_IDS[idx];
		if (id) scrollToSection(id);
	}

	const canUp = $derived(activeIndex > 0);
	const canDown = $derived(activeIndex < SECTION_IDS.length - 1);
</script>

<!-- Fixed vertical nav arrows, centered on right edge -->
<div
	class="fixed right-4 top-1/2 -translate-y-1/2 z-(--z-nav) flex flex-col gap-2"
	aria-label="Section navigation"
>
	<button
		onclick={() => go(activeIndex - 1)}
		disabled={!canUp}
		aria-label="Previous section"
		class="nav-arrow {canUp ? 'opacity-100' : 'opacity-20 cursor-not-allowed'}"
	>
		<ChevronUp size={20} />
	</button>

	<!-- Dot indicators -->
	<div class="flex flex-col gap-1.5 items-center py-1">
		{#each SECTION_IDS as _id, i (_id)}
			<button
				onclick={() => go(i)}
				aria-label="Go to section {i + 1}"
				class="w-1.5 rounded-full transition-all duration-300 cursor-pointer border-none p-0 {i ===
				activeIndex
					? 'h-4 bg-white'
					: 'h-1.5 bg-white/40 hover:bg-white/70'}"
			></button>
		{/each}
	</div>

	<button
		onclick={() => go(activeIndex + 1)}
		disabled={!canDown}
		aria-label="Next section"
		class="nav-arrow {canDown ? 'opacity-100' : 'opacity-20 cursor-not-allowed'}"
	>
		<ChevronDown size={20} />
	</button>
</div>

<style>
	.nav-arrow {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.25);
		color: white;
		cursor: pointer;
		transition:
			background 0.2s,
			opacity 0.3s;
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
	}
	.nav-arrow:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.25);
	}
</style>
