<script lang="ts">
	import { X, ExternalLink } from 'lucide-svelte';

	let dialog: HTMLDialogElement;
	let visible = $state(false);

	export function open() {
		dialog.showModal();
		// next tick so CSS transition fires
		requestAnimationFrame(() => {
			visible = true;
		});
	}
	function close() {
		visible = false;
		// wait for fade-out then close
		dialog.addEventListener('transitionend', () => dialog.close(), { once: true });
	}
	function onBackdrop(e: MouseEvent) {
		if (e.target === dialog) close();
	}

	const acts = [
		{
			href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20200000532',
			label: 'Ustawa o własności lokali'
		},
		{
			href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20190001186',
			label: 'Prawo budowlane'
		},
		{
			href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20190001145',
			label: 'Kodeks cywilny'
		},
		{
			href: 'https://ekw.ms.gov.pl/eukw_ogol/menu.do',
			label: 'Księgi wieczyste – online'
		},
		{
			href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20190002204',
			label: 'Ustawa o księgach wieczystych i hipotece'
		},
		{
			href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20200000065',
			label: 'Ustawa o gospodarce nieruchomościami'
		},
		{
			href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20190001065',
			label:
				'Warunki techniczne, jakim powinny odpowiadać budynki – Rozporządzenie z dnia 12 kwietnia 2002'
		},
		{
			href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19990740836',
			label:
				'Warunki techniczne użytkowania budynków mieszkalnych – Rozporządzenie z dnia 16 sierpnia 1999'
		}
	];
</script>

<dialog bind:this={dialog} onclick={onBackdrop} aria-label="Akty prawne" class="dialog-root">
	<div class="dialog-panel {visible ? 'panel-in' : 'panel-out'}">
		<!-- Header -->
		<div
			class="flex items-center justify-between px-7 py-5 border-b border-(--color-border) shrink-0"
		>
			<h2 class="font-heading text-2xl font-semibold text-heading m-0">Akty prawne</h2>
			<button
				onclick={close}
				aria-label="Zamknij"
				class="flex items-center justify-center w-9 h-9 rounded-full border border-(--color-border) text-text-muted hover:bg-bg-alt hover:text-text transition-colors cursor-pointer bg-transparent"
			>
				<X size={18} />
			</button>
		</div>

		<!-- List -->
		<ul
			class="overflow-y-auto px-6 pt-5 pb-6 flex flex-col gap-2 list-none m-0"
			style="scrollbar-width: thin"
		>
			{#each acts as act (act.href)}
				<li>
					<a
						href={act.href}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-start justify-between gap-3 px-4 py-3.5 border border-(--color-border) rounded-lg bg-bg-alt text-link text-sm leading-snug no-underline hover:border-primary hover:bg-(--color-surface) hover:translate-x-0.5 transition-all duration-200"
					>
						<span class="flex-1">{act.label}</span>
						<ExternalLink size={14} class="shrink-0 mt-0.5 opacity-50" />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</dialog>

<style>
	/* Native dialog reset + centering */
	.dialog-root {
		background: transparent;
		border: none;
		padding: 0;
		position: fixed;
		inset: 0;
		margin: auto;
		width: min(680px, 88vw);
		max-height: 90dvh;
		transition: opacity 0.25s ease;
	}

	.dialog-root:not([open]) {
		display: none;
	}

	.dialog-root::backdrop {
		background: rgba(0, 0, 0, 0.85);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		transition: opacity 0.25s ease;
	}

	/* Panel slide-in animation */
	.dialog-panel {
		background: var(--color-surface);
		border-radius: var(--radius-2xl, 1rem);
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		max-height: 90dvh;
		overflow: hidden; /* keeps border-radius clipping */
		transform: translateY(24px) scale(0.97);
		opacity: 0;
		transition:
			transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
			opacity 0.25s ease;
	}

	.panel-in {
		transform: translateY(0) scale(1);
		opacity: 1;
	}

	.panel-out {
		transform: translateY(24px) scale(0.97);
		opacity: 0;
	}
</style>
