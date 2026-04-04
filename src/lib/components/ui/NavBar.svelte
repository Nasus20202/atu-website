<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X } from 'lucide-svelte';
	import { scrollToSection, createSectionObserver } from '$lib/sections';

	let { onLegalActs: _onLegalActs }: { onLegalActs?: () => void } = $props();

	let scrolled = $state(false);
	let menuOpen = $state(false);
	let activeId = $state<string>('atu');

	const sections = [
		{ id: 'atu', label: 'ATU' },
		{ id: 'zarzadzanie', label: 'Zarządzanie' },
		{ id: 'omnie', label: 'O mnie' },
		{ id: 'oferta', label: 'Oferta' },
		{ id: 'uprawnienia', label: 'Uprawnienia i akty' },
		{ id: 'contact', label: 'Kontakt' }
	];

	onMount(() => {
		const root = document.querySelector('.snap-root') as HTMLElement | null;
		const target = root ?? window;
		const getScrollTop = () => (root ? root.scrollTop : window.scrollY);

		// scroll state for nav background
		const onScroll = () => {
			scrolled = getScrollTop() > 80;
		};
		onScroll();
		target.addEventListener('scroll', onScroll, { passive: true });

		// shared observer
		const cleanup = createSectionObserver((id) => {
			activeId = id;
			history.replaceState(null, '', `#${id}`);
		});

		return () => {
			target.removeEventListener('scroll', onScroll);
			cleanup();
		};
	});

	function closeMenu() {
		menuOpen = false;
	}

	function navigate(id: string) {
		scrollToSection(id);
		closeMenu();
	}
</script>

<nav
	class="fixed top-0 inset-x-0 z-(--z-nav) transition-[background-color,border-bottom-color,box-shadow,backdrop-filter] duration-300"
	class:scrolled-nav={scrolled}
	aria-label="Nawigacja główna"
>
	<div class="max-w-6xl mx-auto px-6 flex items-center justify-between h-17">
		<!-- Brand -->
		<button
			onclick={() => navigate('atu')}
			class="font-heading text-xl font-bold tracking-tight transition-colors duration-300 cursor-pointer bg-transparent border-none p-0 {scrolled
				? 'text-primary'
				: 'text-white'}"
		>
			ATU Nieruchomości
		</button>

		<!-- Desktop nav -->
		<ul class="hidden md:flex items-center gap-1 list-none m-0 p-0">
			{#each sections as s (s.id)}
				<li>
					<button
						onclick={() => navigate(s.id)}
						class="px-3.5 py-1.5 rounded text-sm font-medium transition-all duration-200 cursor-pointer bg-transparent border-none font-body {activeId ===
						s.id
							? scrolled
								? 'text-primary bg-bg-alt'
								: 'text-white bg-white/15'
							: scrolled
								? 'text-text'
								: 'text-white/70 hover:text-white'}"
					>
						{s.label}
					</button>
				</li>
			{/each}
		</ul>

		<!-- Mobile toggler -->
		<button
			class="flex md:hidden items-center justify-center w-10 h-10 rounded border transition-colors cursor-pointer bg-transparent {scrolled
				? 'border-border text-text'
				: 'border-white/50 text-white'}"
			aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			{#if menuOpen}<X size={20} />{:else}<Menu size={20} />{/if}
		</button>
	</div>

	<!-- Mobile dropdown -->
	{#if menuOpen}
		<div
			class="md:hidden absolute top-17 right-4 bg-white/95 dark:bg-[#0f1923]/97 border border-border rounded-xl shadow-xl backdrop-blur-lg min-w-50 p-2 flex flex-col gap-0.5"
		>
			{#each sections as s (s.id)}
				<button
					onclick={() => navigate(s.id)}
					class="text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-none w-full font-body {activeId ===
					s.id
						? 'text-primary bg-bg-alt'
						: 'text-text hover:bg-bg-alt'}"
				>
					{s.label}
				</button>
			{/each}
		</div>
	{/if}
</nav>

<style>
	nav {
		border-bottom: 1px solid transparent;
	}

	.scrolled-nav {
		background: rgba(255, 255, 255, 0.97);
		border-bottom-color: rgba(0, 0, 0, 0.08);
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
		backdrop-filter: blur(8px);
	}

	@media (prefers-color-scheme: dark) {
		.scrolled-nav {
			background: rgba(15, 25, 35, 0.97);
			border-bottom-color: rgba(255, 255, 255, 0.06);
		}
	}
</style>
