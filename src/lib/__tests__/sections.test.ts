import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SECTION_IDS, scrollToSection, createSectionObserver } from '../sections';

describe('SECTION_IDS', () => {
	it('exports an ordered tuple of all section ids', () => {
		expect(SECTION_IDS).toEqual([
			'atu',
			'zarzadzanie',
			'omnie',
			'oferta',
			'uprawnienia',
			'contact'
		]);
	});

	it('has exactly 6 sections', () => {
		expect(SECTION_IDS.length).toBe(6);
	});
});

describe('scrollToSection', () => {
	let snapRoot: HTMLDivElement;
	let targetSection: HTMLElement;

	beforeEach(() => {
		// Set up a .snap-root element with a target section inside
		snapRoot = document.createElement('div');
		snapRoot.className = 'snap-root';
		snapRoot.scrollTo = vi.fn();

		targetSection = document.createElement('section');
		targetSection.id = 'oferta';
		Object.defineProperty(targetSection, 'offsetTop', { value: 800, configurable: true });

		snapRoot.appendChild(targetSection);
		document.body.appendChild(snapRoot);
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('calls root.scrollTo with the target offsetTop when snap-root exists', () => {
		scrollToSection('oferta');
		expect(snapRoot.scrollTo).toHaveBeenCalledWith({ top: 800, behavior: 'smooth' });
	});

	it('falls back to scrollIntoView when snap-root is absent', () => {
		document.body.removeChild(snapRoot);

		// Put the target section directly in body (no snap-root)
		const section = document.createElement('section');
		section.id = 'atu';
		section.scrollIntoView = vi.fn();
		document.body.appendChild(section);

		scrollToSection('atu');
		expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
	});

	it('does nothing if the target section does not exist', () => {
		expect(() => scrollToSection('nonexistent')).not.toThrow();
	});
});

describe('createSectionObserver', () => {
	let observeMock: ReturnType<typeof vi.fn>;
	let disconnectMock: ReturnType<typeof vi.fn>;
	let observerCallback: (
		_entries: IntersectionObserverEntry[],
		_observer: IntersectionObserver
	) => void;
	let snapRoot: HTMLElement;
	let sections: HTMLElement[];

	beforeEach(() => {
		observeMock = vi.fn();
		disconnectMock = vi.fn();

		// Capture the callback passed to IntersectionObserver
		// Must use a class so `new IntersectionObserver(...)` works
		vi.stubGlobal(
			'IntersectionObserver',
			class {
				observe = observeMock;
				disconnect = disconnectMock;
				constructor(
					cb: (_entries: IntersectionObserverEntry[], _observer: IntersectionObserver) => void
				) {
					observerCallback = cb;
				}
			}
		);

		// Create snap-root and all sections
		snapRoot = document.createElement('div');
		snapRoot.className = 'snap-root';

		sections = SECTION_IDS.map((id) => {
			const el = document.createElement('section');
			el.id = id;
			snapRoot.appendChild(el);
			return el;
		});

		document.body.appendChild(snapRoot);
	});

	afterEach(() => {
		document.body.innerHTML = '';
		vi.unstubAllGlobals();
	});

	it('observes all section elements', () => {
		createSectionObserver(vi.fn());
		expect(observeMock).toHaveBeenCalledTimes(SECTION_IDS.length);
	});

	it('calls onActive with the correct section id when it becomes visible', () => {
		const onActive = vi.fn();
		createSectionObserver(onActive);

		// Simulate intersection for "omnie"
		const omnieSection = sections.find((s) => s.id === 'omnie')!;
		observerCallback(
			[
				{
					isIntersecting: true,
					intersectionRatio: 0.6,
					target: omnieSection
				} as unknown as IntersectionObserverEntry
			],
			{} as IntersectionObserver
		);

		expect(onActive).toHaveBeenCalledWith('omnie');
	});

	it('does NOT call onActive when intersectionRatio < 0.5', () => {
		const onActive = vi.fn();
		createSectionObserver(onActive);

		observerCallback(
			[
				{
					isIntersecting: true,
					intersectionRatio: 0.3,
					target: sections[0]
				} as unknown as IntersectionObserverEntry
			],
			{} as IntersectionObserver
		);

		expect(onActive).not.toHaveBeenCalled();
	});

	it('does NOT call onActive when isIntersecting is false', () => {
		const onActive = vi.fn();
		createSectionObserver(onActive);

		observerCallback(
			[
				{
					isIntersecting: false,
					intersectionRatio: 0.9,
					target: sections[0]
				} as unknown as IntersectionObserverEntry
			],
			{} as IntersectionObserver
		);

		expect(onActive).not.toHaveBeenCalled();
	});

	it('returns a cleanup function that disconnects the observer', () => {
		const cleanup = createSectionObserver(vi.fn());
		cleanup();
		expect(disconnectMock).toHaveBeenCalledOnce();
	});
});
