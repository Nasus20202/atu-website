<script lang="ts">
	import BulletItem from '../BulletItem.svelte';
	let { text }: { text: string } = $props();
</script>

<ul><BulletItem>{text}</BulletItem></ul>
