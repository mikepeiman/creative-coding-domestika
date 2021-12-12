<script>
	let numSketches = 10;
	let sketches = [];
	for (let i = 1; i < numSketches + 1; i++) {
        let url, name
        i < 10 ? name = `Sketch 0${i}` : name = `Sketch ${i}`
        i < 10 ? url = `sketch0${i}` : url = `sketch${i}`
		let sketch = {
			name: name,
			url: url,
		};
		sketches.push(sketch);
	}
</script>

<div class="sidebar bg-gray-700" id="sideNav">
	<nav>
		{#each sketches as sketch, i}
			<a href={sketch.url} class="bg-indigo-600 hover:bg-indigo-500">{sketch.name}</a>
		{/each}
	</nav>
</div>

<style lang="scss">
	:global(.sidebar) {
		grid-area: sidebar;
		width: 10rem;
	}
	#sideNav {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		font-family: 'Montserrat', sans-serif;
		a {
			margin: 1em;
			text-decoration: none;
			font-weight: 500;
		}

		nav {
			display: flex;
			flex-direction: column;
			a {
				@apply rounded-lg p-4;
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
