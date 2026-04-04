<script lang="ts">
	import SectionLabel from '../ui/SectionLabel.svelte';
	import BulletItem from '../ui/BulletItem.svelte';
	import SectionLink from '../ui/SectionLink.svelte';
</script>

<section id="omnie" class="snap-section">
	<div class="inner-scroll">
		<div class="glass-card p-8 md:p-10">
			<h2 class="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold mb-6 text-heading">
				O mnie
			</h2>

			<div class="flex flex-col gap-3 mb-5 text-base leading-relaxed text-text">
				<p>
					Szanowni Państwo, witam wszystkich serdecznie! Nazywam się Krzysztof Nasuta, jestem
					absolwentem Politechniki Gdańskiej oraz Wyższej Szkoły Gospodarowania Nieruchomościami w
					Warszawie. Posiadam licencję zawodową Zarządcy Nieruchomości o numerze
					<strong class="text-heading">25285</strong> wydaną przez Ministra Transportu, Budownictwa i
					Gospodarki Morskiej.
				</p>
				<p>
					Jestem właścicielem rodzinnej firmy <strong class="text-heading"
						>ATU – Zarządzanie Wspólnotami Mieszkaniowymi –
						<SectionLink href="mailto:zwm24@wp.pl">ZWM24@wp.pl</SectionLink></strong
					>
					świadczącej kompleksowe usługi w zakresie zarządzania i administrowania oraz utrzymania technicznego
					nieruchomości. Firma nasza posiada, w ramach prowadzonej działalności, ubezpieczenie od odpowiedzialności
					cywilnej, związane bezpośrednio ze świadczeniem usług w zakresie zarządzania powierzonymi jej
					nieruchomościami.
				</p>
				<p>
					Dbam o to, by moje kwalifikacje były jak najwyższe. Na bieżąco śledzę wszystkie zmiany w
					ustawodawstwie dotyczącym nieruchomości. Uczestniczę w kursach i szkoleniach
					organizowanych przez Polską Federację Organizacji Zarządców i Administratorów
					Nieruchomości. Moi współpracownicy to osoby kulturalne i fachowe, które posiadają rzetelne
					przygotowanie do wykonywanych obowiązków.
				</p>
				<p>
					Szczególną uwagę zwracam na jakość obsługi naszych Klientów. Stosujemy Standardy
					Zarządzania opracowane przez Ogólnopolską Izbę Gospodarki Nieruchomościami.
				</p>
				<p class="text-text-muted text-xs mt-1">
					Licencjonowany Zarządca Nieruchomości — <strong class="text-text">Krzysztof Nasuta</strong
					>
				</p>
			</div>

			<p class="text-center text-text-muted italic text-base mb-6">
				Mieszkaj spokojnie! My zajmiemy się resztą!<br />
				<span class="text-xs opacity-70"
					>Moje kwalifikacje potwierdzone są Państwową Licencją Zarządcy Nieruchomości nr 25285</span
				>
			</p>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border items-start">
				<div>
					<div class="mb-3"><SectionLabel>Co mnie wyróżnia?</SectionLabel></div>
					<ul class="flex flex-col gap-2">
						{#each ['Rzetelność i pełna przejrzystość prowadzonej dokumentacji finansowej', 'Pełne zaangażowanie w bezproblemowe istnienie wspólnoty i stała troska o nieruchomości', 'Do każdej wspólnoty podchodzę indywidualnie, pamiętając jednak, że to właściciele nieruchomości są jej gospodarzami, a ja jestem po to, by pomóc Państwu w rozwiązywaniu problemów'] as item (item)}
							<BulletItem>{item}</BulletItem>
						{/each}
					</ul>
				</div>
				<div>
					<div class="mb-3"><SectionLabel>Kontakt</SectionLabel></div>
					<ul class="flex flex-col gap-2">
						<BulletItem
							>Każdą Wspólnotę Mieszkaniową nadzoruję osobiście. Wszystkich informacji w sprawie
							obsługi technicznej, dokumentacji księgowej lub spraw administracyjnych udzielam
							telefonicznie lub mailowo i biorę całą odpowiedzialność za wyjaśnienie wszystkich
							spraw.</BulletItem
						>
						<BulletItem>
							Zarządca nieruchomości jest do Twojej wyłącznej dyspozycji — zadzwoń:
							<SectionLink href="tel:+48601640146" underline>601-64-01-46</SectionLink>
							lub napisz:
							<SectionLink href="mailto:zwm24@wp.pl" underline>ZWM24@wp.pl</SectionLink>
						</BulletItem>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
