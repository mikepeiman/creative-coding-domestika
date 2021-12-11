<script>
</script>

<svelte:head>
	<title>Creative Coding</title>
</svelte:head>
<div class="main">
	<div class="pad bg-indigo-400"></div>
	<div class="title flex flex-col items-center py-6">
		<h1
			class="p-6 font-extrabold text-8xl "
		>
			Creative Coding
		</h1>
		<p class="text-2xl text-sky-300">Inspired by Bruno Imbrizi's course</p>
		<!--  text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-sky-400 -->
	</div>
	<div class="body bg-sky-600"></div>
</div>

<style>
	.main {
		grid-area: main;
		display: grid;
		height: 100%;
		grid-template-columns: 60vw;
		grid-template-rows: 15% 25% 60%;
		grid-template-areas:
			'pad'
			'title'
			'body';
	}
	.title {
		grid-area: title;
	}
	.body {
		grid-area: body;
	}
	.pad {
		grid-area: pad;
	}
	h1 {
		/* font-size: 3rem; */
		/* font-weight: 800; */
		/* background: -webkit-linear-gradient(
			0deg,
			rgba(72, 0, 36, 1) 0%,
			rgba(9, 121, 121, 1) 25%,
			rgba(56, 121, 255, 1) 50%,
			rgba(121, 9, 121, 1) 75%,
			rgba(2, 0, 76, 1) 100%
		);

		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent; */
	}
</style>
