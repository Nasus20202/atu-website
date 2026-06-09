import { SECTION_IDS } from '$lib/sections';
import type { EntryGenerator } from './$types';

export const prerender = true;

export function entries(): ReturnType<EntryGenerator> {
	return SECTION_IDS.filter((s) => s !== 'atu').map((section) => ({ section }));
}
