<script lang="ts">
	import SectionLabel from '../ui/SectionLabel.svelte';
</script>

<section id="oferta" class="snap-section">
	<div class="inner-scroll">
		<div class="glass-card p-8 md:p-10">
			<h2 class="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold mb-4 text-heading">
				Oferta
			</h2>

			<p class="text-text text-base leading-relaxed mb-5 max-w-3xl">
				Firma <strong class="text-heading"
					>ATU – Zarządzanie Wspólnotami Mieszkaniowymi – ZWM24@wp.pl</strong
				>
				oferuje
				<strong class="text-heading"
					>kompleksowe usługi zarządzania nieruchomościami mieszkaniowymi</strong
				>
				w zakresie prowadzenia bieżących spraw związanych ze zwykłą eksploatacją budynku, nieprzekraczających
				zwykłego zarządu nieruchomością wspólną oraz utrzymania obiektu w stanie niepogorszonym ponad
				granice normalnego zużycia.
			</p>

			<div class="mb-2">
				<SectionLabel>Kompleksowe zarządzanie nieruchomością w naszej firmie to:</SectionLabel>
			</div>
			<div class="md:columns-2 gap-x-6 mb-5">
				{#each ['prowadzenie spraw administracyjno-eksploatacyjnych', 'obsługa techniczna obiektu', 'obsługa finansowo-księgowa', 'sporządzanie planów i raportów'] as item (item)}
					<p
						class="text-text-muted text-sm leading-relaxed pl-3 relative py-0.5 before:content-['›'] before:absolute before:left-0 before:text-primary before:font-bold break-inside-avoid"
					>
						{item}
					</p>
				{/each}
			</div>

			<div class="mb-2">
				<SectionLabel>Do obowiązków Zarządcy należeć będzie w szczególności:</SectionLabel>
			</div>
			<div class="md:columns-2 gap-x-6 mb-5">
				{#each ['Prowadzenie ewidencji księgowej Wspólnoty Mieszkaniowej', 'Prowadzenie Księgi Obiektu Budowlanego oraz dokumentacji technicznej nieruchomości wspólnej wymaganej przez przepisy prawa budowlanego', 'Nadzór nad remontami i naprawami', 'Sporządzanie sprawozdań finansowych', 'Organizacja przeglądów technicznych nieruchomości i urządzeń budynku zgodnie z wymogami prawa budowlanego', 'Kontrola płynności finansowej nieruchomości', 'Rozliczanie mediów indywidualnych – woda, centralne ogrzewanie, ciepła woda', 'Zawieranie i kontrola prawidłowości realizacji umów podpisanych na obsługę nieruchomości', 'Prowadzenie i aktualizowanie wykazu Członków Wspólnoty oraz przypadających im udziałów w nieruchomości wspólnej', 'Pozasądowa windykacja należności z tytułu zarządu nieruchomością wspólną', 'Opracowywanie dokumentów wewnętrznych: uchwał, regulaminów, itp.', 'Przygotowywanie projektów planu gospodarczego', 'Zlecanie usuwania przyczyn i skutków awarii', 'Podejmowanie innych niezbędnych działań zmierzających do ochrony interesów majątkowych i niemajątkowych Wspólnoty', 'Weryfikowanie stanu prawnego i faktycznego nieruchomości', 'Utrzymanie w należytym porządku i czystości pomieszczeń i urządzeń budynku służących do wspólnego użytku właścicieli lokali oraz terenu przynależnego do nieruchomości', 'Zapewnienie dla nieruchomości dostaw energii elektrycznej, energii cieplnej, wody i gazu, odprowadzania ścieków i wywozu śmieci', 'Opłacanie podatków i innych opłat publicznoprawnych przypadających od nieruchomości wspólnej oraz ubezpieczenie Wspólnoty Mieszkaniowej', 'Zwoływanie i obsługa zebrań Wspólnoty Mieszkaniowej'] as item (item)}
					<p
						class="text-text-muted text-sm leading-relaxed pl-3 relative py-0.5 before:content-['›'] before:absolute before:left-0 before:text-primary before:font-bold break-inside-avoid"
					>
						{item}
					</p>
				{/each}
			</div>

			<p class="text-text-muted text-[0.7rem] leading-relaxed border-t border-border pt-3">
				Zarządzanie i administrowanie nieruchomością prowadzone jest zgodnie z regulacjami prawnymi
				zawartymi w Ustawie o gospodarce nieruchomościami, Ustawie o własności lokali, Ustawie prawo
				budowlane i według postanowień Umowy o zarządzanie nieruchomością wspólną Wspólnoty
				Mieszkaniowej w ramach tzw. zarządu zwykłego, w zakresie zleconym przez Zarząd Wspólnoty
				Mieszkaniowej.
			</p>
		</div>
	</div>
</section>
