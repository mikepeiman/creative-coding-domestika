<script>
	let links = [
		{ title: 'Home', url: '/' },
		{ title: 'About', url: '/about' },
		{ title: 'Creative', url: '/creative' }
	];
</script>

<div class="header bg-gray-700  bg-gradient-to-r from-gray-700 to-indigo-500 flex items-center"> 
    <!--  bg-gradient-to-r from-gray-700 to-indigo-500  -->
	<nav class="w-screen flex justify-center items-center">
		{#each links as link}
			<a href={link.url} class="">{link.title}</a>
		{/each}
	</nav>
</div>

<style lang="scss">
	:global(.header) {
		grid-area: header;
	}
	nav {
		// width: 100vw;
        padding-left: 10rem;
		// font-family: 'Montserrat', sans-serif;
		a {
			@apply mx-6 text-xl;
			:hover {
				@apply text-sky-600 underline decoration-sky-100 underline-offset-2;
			}
		}
	}

	h1 {
		font-size: 3rem;
		font-weight: 800;
		background: -webkit-linear-gradient(
			0deg,
			rgba(72, 0, 36, 1) 0%,
			rgba(9, 121, 121, 1) 25%,
			rgba(121, 121, 155, 1) 50%,
			rgba(121, 9, 121, 1) 75%,
			rgba(2, 0, 76, 1) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
