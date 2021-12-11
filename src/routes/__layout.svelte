<script>
	import Footer from '$components/Footer.svelte';
import SideNav from '$components/SideNav.svelte';
	import '../app.scss';
	import Nav from '../components/Nav.svelte';
</script>

<div id="layout-container" class="grid w-screen h-screen">
	<Nav  class="header">
		<slot class="header" />
	</Nav>
	<SideNav  class="sidebar">
		<slot class="sidebar" />
	</SideNav>
	<div class="main flex flex-col items-center jutify-center">
		<slot  />
	</div>
	<Footer />
</div>

<style lang="scss">
	:global(#layout-container) {
		// height: 100vh;
		// width: 100vw;
		grid-template-rows: 5rem 1fr 1fr 80px;
		grid-template-columns: 10rem calc(100vw - 20rem) 10rem;
		grid-template-areas:
			'header header header'
			'sidebar main main'
			'sidebar main main'
			'footer footer footer';
	}
	.main {
		grid-area: main;
		// display: flex;
		// flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.header {
		grid-area: header;
	}

	.sidebar {
		grid-area: sidebar;
	}
</style>
