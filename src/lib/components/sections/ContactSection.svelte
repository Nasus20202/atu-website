<script lang="ts">
	import { Building2, MapPin, Phone, Mail } from 'lucide-svelte';

	const items = [
		{
			icon: Building2,
			label: 'Firma',
			value: 'ATU – Zarządzanie Wspólnotami Mieszkaniowymi',
			href: 'mailto:zwm24@wp.pl'
		},
		{
			icon: MapPin,
			label: 'Adres',
			value: 'Al. Grunwaldzka 609 B / 32\n80-337 Gdańsk',
			href: 'https://goo.gl/maps/3DrLqWpNKUQ1m1jm8',
			external: true
		},
		{
			icon: Phone,
			label: 'Telefon',
			value: '601-64-01-46',
			href: 'tel:+48601640146'
		},
		{
			icon: Mail,
			label: 'Email',
			values: ['zwm24@wp.pl', 'atu@atu.nieruchomosci.pl'],
			hrefs: ['mailto:zwm24@wp.pl', 'mailto:atu@atu.nieruchomosci.pl']
		}
	];
</script>

<section id="contact" class="snap-section">
	<div class="inner-scroll max-w-2xl">
		<div class="glass-card p-8 md:p-10">
			<h2 class="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold mb-7 text-heading">
				Kontakt
			</h2>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{#each items as item (item.label)}
					<div class="rounded-xl border border-border contact-card p-5 flex flex-col gap-3">
						<div class="flex items-center gap-2">
							<span class="text-primary"><item.icon size={20} /></span>
							<span class="text-xs font-semibold uppercase tracking-widest text-primary"
								>{item.label}</span
							>
						</div>

						{#if item.values}
							<div class="flex flex-col gap-1">
								{#each item.values as val, i (val)}
									<a
										href={item.hrefs[i]}
										rel="nofollow"
										class="text-text hover:text-primary transition-colors text-base leading-snug font-medium"
									>
										{val}
									</a>
								{/each}
							</div>
						{:else}
							<a
								href={item.href}
								target={item.external ? '_blank' : undefined}
								rel={item.external ? 'noopener noreferrer nofollow' : 'nofollow'}
								class="text-text hover:text-primary transition-colors text-base leading-snug font-medium whitespace-pre-line"
							>
								{item.value}
							</a>
						{/if}
					</div>
				{/each}
			</div>

			<p class="text-center text-text-muted text-sm mt-6">
				ATU Nieruchomości &copy; {new Date().getFullYear()}
			</p>
		</div>
	</div>
</section>

<style>
	.contact-card {
		background: rgba(255, 255, 255, 0.4);
	}
	@media (prefers-color-scheme: dark) {
		.contact-card {
			background: rgba(255, 255, 255, 0.06);
		}
	}
</style>
