/**
 * Shared section navigation utilities.
 *
 * - SECTION_IDS: canonical ordered list of all snap-section ids
 * - scrollToSection: smooth-scrolls the snap-root to the given section id
 * - createSectionObserver: sets up a single IntersectionObserver watching all
 *   sections and calls onActive(id) whenever one becomes >= 50% visible.
 *   Returns a cleanup function (disconnect).
 */

export const SECTION_IDS = [
	'atu',
	'zarzadzanie',
	'omnie',
	'oferta',
	'uprawnienia',
	'contact'
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function scrollToSection(id: string): void {
	const root = document.querySelector('.snap-root');
	const target = document.getElementById(id);
	if (root && target) {
		root.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
	} else {
		target?.scrollIntoView({ behavior: 'smooth' });
	}
}

export function createSectionObserver(onActive: (_id: string) => void): () => void {
	const root = document.querySelector('.snap-root') as HTMLElement | null;
	const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
					onActive(entry.target.id);
				}
			}
		},
		{ root, threshold: 0.5 }
	);

	els.forEach((el) => observer.observe(el));
	return () => observer.disconnect();
}
