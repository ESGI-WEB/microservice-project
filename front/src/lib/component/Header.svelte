<script lang="ts">
	import modal from '$src/stores/modal';
	import FaUserSecret from 'svelte-icons/fa/FaUserSecret.svelte';
	import FaUserTie from 'svelte-icons/fa/FaUserTie.svelte';
	import { muteToast } from '$src/stores/user';
	import Login from './auth/Login.svelte';
	import Logout from './auth/Logout.svelte';
	import { page } from '$app/stores';

	export let headerHeight;

	let pages = [
		{
			name: 'User',
			path: '/user'
		}
	];


	const handleSession = () => {
		modal.open(($page.data.user ? Logout : Login) as any, { inModal: true });
	};
</script>

<div class="pt-2 px-2 bg-base-200" bind:clientHeight={headerHeight}>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<!-- svelte-ignore a11y-missing-attribute -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="navbar p-0 pr-2 glass rounded-xl">
		<div class="navbar-start">
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h8m-8 6h16"
						/></svg
					>
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-20"
				>
					{#each pages as page}
						<li>
							<a href={page.path}>{page.name}</a>
						</li>
					{/each}
					<li tabindex="0">
						<a class="justify-between">
							Sort
							<svg
								class="fill-current"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg
							>
						</a>
					</li>
					<li on:click={() => muteToast.update((r) => !r)}>
						<a>{$muteToast ? 'Unmute Toast' : 'Mute Toast'}</a>
					</li>
				</ul>
			</div>
			<a class="btn btn-ghost normal-case text-xl" href="/">gRPC Task Manager</a>
		</div>
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal px-1 z-20">
				{#each pages as page}
					<li>
						<a href={page.path}>{page.name}</a>
					</li>
				{/each}
				<li tabindex="0">
					<a>
						Sort
						<svg
							class="fill-current"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
						>
					</a>
				</li>
				<li on:click={() => muteToast.update((r) => !r)}>
					<a>{$muteToast ? 'Unmute Toast' : 'Mute Toast'}</a>
				</li>
			</ul>
		</div>
		<div class="navbar-end">
			<button class="btn btn-ghost btn-circle avatar" on:click={handleSession}>
				{#if $page.data.user}
					<FaUserTie />
				{:else}
					<FaUserSecret />
				{/if}
			</button>
		</div>
	</div>
</div>
