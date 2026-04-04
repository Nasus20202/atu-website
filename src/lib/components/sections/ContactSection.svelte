<script lang="ts">
	import { Building2, MapPin, Phone, Mail } from 'lucide-svelte';
</script>

<section id="contact" class="snap-section">
	<div class="inner-scroll max-w-xl">
		<div class="glass-card p-8 md:p-10 text-white">
			<h2 class="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold mb-7">Kontakt</h2>

			<address class="not-italic flex flex-col divide-y divide-white/8">
				{#each [{ icon: Building2, href: 'mailto:zwm24@wp.pl', label: 'ATU – Zarządzanie Wspólnotami Mieszkaniowymi' }, { icon: MapPin, href: 'https://goo.gl/maps/3DrLqWpNKUQ1m1jm8', external: true, label: 'Al. Grunwaldzka 609 B / 32,  80-337 Gdańsk' }, { icon: Phone, href: 'tel:+48601640146', label: 'Tel.: 601-64-01-46' }, { icon: Mail, href: 'mailto:zwm24@wp.pl', label: 'Email: zwm24@wp.pl' }] as item (item.label)}
					<div class="flex items-start gap-4 py-4">
						<span class="text-sky-300 shrink-0 mt-0.5"><item.icon size={24} /></span>
						<a
							href={item.href}
							target={item.external ? '_blank' : undefined}
							rel={item.external ? 'noopener noreferrer nofollow' : 'nofollow'}
							class="text-white/85 hover:text-sky-300 transition-colors text-base leading-snug"
						>
							{item.label}
						</a>
					</div>
				{/each}
			</address>

			<p class="text-center text-white/30 text-sm mt-6 pt-4 border-t border-white/8">
				ATU Nieruchomości &copy; {new Date().getFullYear()}
			</p>
		</div>
	</div>
</section>
