<script lang="ts">
	import { Home, BookOpen, CheckCircle, GraduationCap } from 'lucide-svelte';
	import SectionLabel from '../ui/SectionLabel.svelte';
	import BulletItem from '../ui/BulletItem.svelte';
	import GhostButton from '../ui/GhostButton.svelte';
	import SectionLink from '../ui/SectionLink.svelte';
</script>

<section id="zarzadzanie" class="snap-section">
	<div class="inner-scroll">
		<div class="glass-card p-8 md:p-10 text-white">
			<h2 class="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold mb-3">
				Zarządzanie Wspólnotami Mieszkaniowymi
			</h2>
			<p class="text-white/80 text-base leading-relaxed mb-6">
				<strong class="text-white"
					>ATU – Zarządzanie Wspólnotami Mieszkaniowymi – ZWM24@wp.pl</strong
				>
				to firma rodzinna oferująca usługi w zakresie zarządzania i administrowania Wspólnotami Mieszkaniowymi.<br
				/>
				<em>Z przyjemnością podejmiemy się zarządzania Państwa nieruchomością.</em>
			</p>

			<div class="mb-4"><SectionLabel>Dlaczego ATU?</SectionLabel></div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 items-start">
				{#each [{ icon: Home, title: 'Dokładność', desc: 'Ponieważ dbam o każdą Wspólnotę Mieszkaniową i nie mogę sobie pozwolić na jej utratę' }, { icon: BookOpen, title: 'Doświadczenie', desc: 'Ponieważ jestem merytorycznie przygotowany, mam niezbędne doświadczenie i nie boję się odpowiedzialności' }, { icon: CheckCircle, title: 'Rzetelność', desc: 'Ponieważ jestem uczciwy, rzetelny i kompetentny' }, { icon: GraduationCap, title: 'Wykształcenie', desc: 'Ponieważ posiadam licencję zawodową zarządcy nieruchomości wydaną przez Ministra Transportu, Budownictwa i Gospodarki Morskiej' }] as item (item.title)}
					<div class="flex gap-3 items-start">
						<span class="text-sky-300 shrink-0 mt-0.5"><item.icon size={28} /></span>
						<div>
							<h3 class="font-semibold text-white text-sm mb-0.5">{item.title}</h3>
							<p class="text-white/65 text-sm leading-relaxed">{item.desc}</p>
						</div>
					</div>
				{/each}
			</div>

			<div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
				<div>
					<div class="mb-2"><SectionLabel>Zakres usług</SectionLabel></div>
					<ul class="flex flex-col gap-1">
						{#each ['Obsługa księgowa i administracyjna', 'Obsługa techniczna nieruchomości', 'Reprezentacja Wspólnoty Mieszkaniowej', 'Doradztwo i pomoc'] as item (item)}
							<BulletItem>{item}</BulletItem>
						{/each}
					</ul>
				</div>
				<GhostButton>
					<SectionLink href="#oferta">Zobacz pełną ofertę</SectionLink>
				</GhostButton>
			</div>
		</div>
	</div>
</section>
