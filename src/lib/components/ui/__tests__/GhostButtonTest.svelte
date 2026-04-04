<script lang="ts">
	import GhostButton from '../GhostButton.svelte';

	let {
		label,
		onclick,
		type
	}: { label: string; onclick?: () => void; type?: 'button' | 'submit' } = $props();
</script>

<GhostButton {onclick} {type}>{label}</GhostButton>
