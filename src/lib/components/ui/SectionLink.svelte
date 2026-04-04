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
	class="text-link hover:text-link-hover transition-colors {underline
		? 'underline underline-offset-2'
		: ''}"
>
	{@render children()}
</a>
