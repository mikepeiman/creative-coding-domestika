<script>
	import CanvasSketch from './CanvasSketch.svelte';
	export let settings = {};
	export let data = {};
	export let sketch = () => {};
	
	let localStorageSupported = (() => {
		try {
			return typeof window.localStorage !== 'undefined';
		} catch (err) {
			return false;
		}
	})();

	// None of this will work in the sandbox REPL but it will work offline
    // saveData(settings, data)
  readData(settings, data);
  $: saveData(settings, data);

  function saveData(settings, data) {
    if (localStorageSupported && settings.localStorage !== false) {
      window.localStorage.setItem(`${data.TITLE}`, JSON.stringify(data));
    }
  }

  function readData(settings, data) {
    if (localStorageSupported && settings.localStorage !== false) {
      try {
        const prev = window.localStorage.getItem(`${data.TITLE}`);
        if (!prev) return;
        const newData = JSON.parse(prev);
        Object.assign(data, newData);
      } catch (err) {
        console.warn(err);
      }
    }
  }
</script>

<main>
	<div class='viewport'>
		<CanvasSketch {data} {settings} {sketch} />
	</div>
	<div class='panel'>
		<slot></slot>
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	
	main {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	}
	.viewport {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100%;
		flex-basis: 60%;
		min-width: 200px;
		flex-grow: 1;
		flex-shrink: 1;
	}
	.panel {
		padding: 20px;
		box-sizing: border-box;
		flex-basis: 300px;
		min-width: 200px;
		max-width: 400px;
		flex-grow: 1;
		flex-shrink: 1;
		height: 100%;
		background: hsl(0, 0%, 95%);
		border-left: 1px solid hsl(0, 0%, 90%);
		overflow-y: scroll;
	}
</style>