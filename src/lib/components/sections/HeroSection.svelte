<script lang="ts">
	import { ArrowDown } from 'lucide-svelte';
	import SectionLink from '../ui/SectionLink.svelte';
</script>

<section id="atu" class="snap-section">
	<div class="relative z-10 text-center text-white px-6" style="margin-top: -60px">
		<h1
			class="font-heading text-[clamp(3rem,7vw,5.5rem)] font-bold tracking-tight drop-shadow-lg mb-4"
		>
			ATU Nieruchomości
		</h1>
		<p
			class="text-[clamp(1.2rem,2.8vw,1.75rem)] font-light text-white/90 mb-6 tracking-wide drop-shadow"
		>
			Zarządzanie Wspólnotami Mieszkaniowymi
		</p>
		<SectionLink href="mailto:zwm24@wp.pl">zwm24@wp.pl</SectionLink>
	</div>

	<a
		href="#zarzadzanie"
		aria-label="Scroll down"
		class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary/70 text-white backdrop-blur-sm hover:bg-primary transition-colors animate-bounce"
	>
		<ArrowDown size={22} />
	</a>
</section>
