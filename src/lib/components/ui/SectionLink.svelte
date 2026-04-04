<script lang="ts">
	let {
		href,
		external = false,
		underline = false,
		children
	}: {
		href: string;
		external?: boolean;
		underline?: boolean;
		children: any;
	} = $props();
</script>

<a
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer nofollow' : 'nofollow'}
	class="text-sky-300 hover:text-sky-100 transition-colors {underline
		? 'underline underline-offset-2'
		: ''}"
>
	{@render children()}
</a>
