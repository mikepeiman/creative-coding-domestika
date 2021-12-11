<script>
	import Footer from '$components/Footer.svelte';
import SideNav from '$components/SideNav.svelte';
	import '../app.scss';
	import Nav from '../components/Nav.svelte';
</script>

<div id="layout-container" class="grid container">
	<Nav  class="header">
		<slot class="header" />
	</Nav>
	<SideNav  class="sidebar">
		<slot class="sidebar" />
	</SideNav>
	<div class="main">
		<slot  />
	</div>
	<Footer />
</div>

<style lang="scss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:global(#layout-container) {
		height: 100vh;
		width: 100vw;
		grid-template-rows: 80px 1fr 80px;
		grid-template-columns: 10rem 1fr 1fr;
		grid-template-areas:
			'header header header'
			'sidebar main main'
			'sidebar main main'
			'footer footer footer';
	}
	.main {
		grid-area: main;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: 'Montserrat', sans-serif;
	}

	.header {
		grid-area: header;
	}

	.sidebar {
		grid-area: sidebar;
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
