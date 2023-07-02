<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { connectToUsageStream } from '$lib/service/usage';

	export let data: PageData;

	onMount(() => {
		if (browser) {
			connectToUsageStream();
		}
	});
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="flex w-full flex-wrap items-center justify-center p-4 overflow-x-auto">
	<div class="card w-96 h-36 bg-base-100 shadow-x">
		<div class="card-body items-center text-center">
			<h2 class="card-title">Page content</h2>
		</div>
	</div>
</div>
