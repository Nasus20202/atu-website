<script lang="ts">
	import { X } from 'lucide-svelte';
	import GhostButton from '../ui/GhostButton.svelte';

	let { onLegalActs }: { onLegalActs?: () => void } = $props();

	let lightboxDialog: HTMLDialogElement;
	let activeImg = $state({ src: '', alt: '' });
	let lightboxVisible = $state(false);

	function openLightbox(src: string, alt: string) {
		activeImg = { src, alt };
		lightboxDialog.showModal();
		requestAnimationFrame(() => {
			lightboxVisible = true;
		});
	}
	function closeLightbox() {
		lightboxVisible = false;
		lightboxDialog.addEventListener('transitionend', () => lightboxDialog.close(), { once: true });
	}
	function onBackdropClick(e: MouseEvent) {
		if (e.target === lightboxDialog) closeLightbox();
	}

	const credentials = [
		{
			src: '/img/lic1.webp',
			alt: 'Świadectwo Zarządcy',
			caption: 'Świadectwo Zarządcy'
		},
		{
			src: '/img/lic2.webp',
			alt: 'Certyfikat Administratora',
			caption: 'Certyfikat Administratora'
		}
	];
</script>

<section id="uprawnienia" class="snap-section">
	<div class="inner-scroll max-w-4xl">
		<div class="glass-card p-8 md:p-10">
			<h2 class="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-bold mb-6 text-heading">
				Uprawnienia
			</h2>

			<div class="flex flex-wrap gap-5 justify-center mb-7">
				{#each credentials as cred (cred.src)}
					<button
						onclick={() => openLightbox(cred.src, cred.alt)}
						class="group relative overflow-hidden rounded-xl border border-border w-44 p-0 bg-transparent cursor-pointer hover:scale-105 transition-transform duration-300"
					>
						<img
							src={cred.src}
							alt={cred.alt}
							loading="lazy"
							width="176"
							height="248"
							class="w-full h-auto block opacity-90 group-hover:opacity-100 transition-opacity"
						/>
						<span
							class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-3 py-2 text-xs font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300"
						>
							{cred.caption}
						</span>
					</button>
				{/each}
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7 pt-5 border-t border-border">
				<p class="text-text-muted text-base leading-relaxed">
					Firma ATU działa na podstawie wpisu do rejestru działalności gospodarczej nr ewid.
					<strong class="text-text">8708 z dnia 30.01.1997</strong> wydanego przez Urząd Miasta Sopotu.
				</p>
				<p class="text-text-muted text-base leading-relaxed">
					Moje kwalifikacje do wykonywania zawodu zarządcy nieruchomości potwierdza dyplom
					ukończenia Wyższej Szkoły Gospodarowania Nieruchomościami w Warszawie, licencja zawodowa
					Zarządcy Nieruchomości o numerze <strong class="text-text">25285</strong> wydana przez Ministra
					Transportu, Budownictwa i Gospodarki Morskiej, certyfikat zawodu Administratora Nieruchomości
					wydany przez Polskie Stowarzyszenie Licencjonowanych Zarządców Nieruchomości.
				</p>
			</div>

			<div class="flex justify-center">
				<GhostButton onclick={onLegalActs}>Akty prawne</GhostButton>
			</div>
		</div>
	</div>
</section>

<!-- Lightbox dialog -->
<dialog
	bind:this={lightboxDialog}
	onclick={onBackdropClick}
	aria-label="Podgląd dokumentu"
	class="lightbox-root"
>
	<div class="lightbox-panel {lightboxVisible ? 'panel-in' : 'panel-out'}">
		<button
			onclick={closeLightbox}
			aria-label="Zamknij podgląd"
			class="absolute top-3 right-3 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 border border-white/30 text-white hover:bg-black/70 transition-colors backdrop-blur-sm cursor-pointer z-10"
		>
			<X size={18} />
		</button>
		<img
			src={activeImg.src}
			alt={activeImg.alt}
			class="w-full h-auto rounded-xl shadow-2xl block"
		/>
	</div>
</dialog>

<style>
	.lightbox-root {
		background: transparent;
		border: none;
		padding: 0;
		position: fixed;
		inset: 0;
		margin: auto;
		width: min(90vw, 700px);
		max-height: 90dvh;
	}

	.lightbox-root:not([open]) {
		display: none;
	}

	.lightbox-root::backdrop {
		background: rgba(0, 0, 0, 0.9);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
	}

	.lightbox-panel {
		position: relative;
		transform: scale(0.88);
		opacity: 0;
		transition:
			transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
			opacity 0.25s ease;
	}

	.panel-in {
		transform: scale(1);
		opacity: 1;
	}

	.panel-out {
		transform: scale(0.88);
		opacity: 0;
	}
</style>
