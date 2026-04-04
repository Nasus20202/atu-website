<script lang="ts">
	import { onMount } from 'svelte';
	import { createSectionObserver } from '$lib/sections';

	// One layer per unique image so we can cross-fade properly.
	// Hero + Management share hero.webp — same id keeps bg stable between them.
	const LAYERS = [
		{ id: 'hero', src: '/img/hero.webp' },
		{ id: 'omnie', src: '/img/waterfront.webp' },
		{ id: 'oferta', src: '/img/fountain.webp' },
		{ id: 'uprawnienia', src: '/img/town-hall.webp' },
		{ id: 'contact', src: '/img/night.webp' }
	];

	const SECTION_TO_LAYER: Record<string, string> = {
		atu: 'hero',
		zarzadzanie: 'hero',
		omnie: 'omnie',
		oferta: 'oferta',
		uprawnienia: 'uprawnienia',
		contact: 'contact'
	};

	let activeLayer = $state('hero');

	onMount(() => {
		return createSectionObserver((id) => {
			const layer = SECTION_TO_LAYER[id];
			if (layer) activeLayer = layer;
		});
	});
</script>

<!-- Fixed backdrop — sits behind .snap-root (z-0) -->
<div class="fixed inset-0 z-0" aria-hidden="true">
	{#each LAYERS as layer (layer.id)}
		<div
			class="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
			style="background-image: url('{layer.src}'); opacity: {activeLayer === layer.id ? 1 : 0};"
		></div>
	{/each}
	<!-- persistent dark overlay so text is always readable -->
	<div class="absolute inset-0 bg-black/55"></div>
</div>
