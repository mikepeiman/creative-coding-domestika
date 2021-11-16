<script>
	let input_file = [],
		contents = '',
		items = [];

	function readFile(input_file) {
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 12 ~ readFile ~ input_file`, input_file);
		if (input_file) {
			console.log(`🚀 ~ file: parseQuotes.svelte ~ line 14 ~ readFile ~ input_file`, input_file[0]);
			let file = input_file[0];
			var reader = new FileReader();
			reader.onload = function (event) {
				contents = event.target.result;
				console.log(`🚀 ~ file: parseQuotes.svelte ~ line 16 ~ readFile ~ contents`, contents);
				console.log('Successfully read file');
                parseFile()
			};
			reader.onerror = function (err) {
				console.error('Failed to read file', err);
			};
			reader.readAsText(file);
		}
	}

	function parseFile() {
		const parser = new DOMParser();
		const htmlDoc = parser.parseFromString(contents, 'text/html');
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 27 ~ parseFile ~ contents`, contents)
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 28 ~ parseFile ~ htmlDoc`, htmlDoc);
        let divs = htmlDoc.getElementsByTagName('div')
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 30 ~ parseFile ~ divs`, divs)
	}
</script>

<input
	class="input input-primary"
	id="fileInput"
	type="file"
	bind:files={input_file}
	on:change={readFile(input_file)}
/>

<style>
	/* ::-webkit-file-upload-button {
		display: none;
	} */

	input#fileInput {
		display: inline-block;
		width: 100%;
		padding: 120px 0 0 0;
		height: 0px;
		overflow: hidden;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-256.png')
			center center no-repeat #e4e4e4;
		border-radius: 20px;
		background-size: 60px 60px;
	}
</style>
