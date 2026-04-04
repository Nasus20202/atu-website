<script lang="ts">
	import NavBar from '$lib/components/ui/NavBar.svelte';
	import BackgroundLayer from '$lib/components/ui/BackgroundLayer.svelte';
	import SectionNav from '$lib/components/ui/SectionNav.svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import ManagementSection from '$lib/components/sections/ManagementSection.svelte';
	import AboutSection from '$lib/components/sections/AboutSection.svelte';
	import OfferSection from '$lib/components/sections/OfferSection.svelte';
	import CredentialsSection from '$lib/components/sections/CredentialsSection.svelte';
	import ContactSection from '$lib/components/sections/ContactSection.svelte';
	import LegalActsDialog from '$lib/components/sections/LegalActsDialog.svelte';

	let legalDialog: LegalActsDialog;
</script>

<svelte:head>
	<title>ATU Nieruchomości</title>
</svelte:head>

<BackgroundLayer />
<NavBar />
<SectionNav />

<div class="snap-root">
	<HeroSection />
	<ManagementSection />
	<AboutSection />
	<OfferSection />
	<CredentialsSection onLegalActs={() => legalDialog.open()} />
	<ContactSection />
</div>

<LegalActsDialog bind:this={legalDialog} />
