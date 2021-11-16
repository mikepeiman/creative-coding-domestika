<script>
        let input_file = [], contents = ""

	function parseInput(input_file) {
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 12 ~ parseInput ~ input_file`, input_file);
		if (input_file) {
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 14 ~ parseInput ~ input_file`, input_file[0])
            let file = input_file[0]


			var reader = new FileReader();
			reader.onload = function (event) {
                contents = event.target.result
                console.log(`🚀 ~ file: parseQuotes.svelte ~ line 16 ~ parseInput ~ contents`, contents)
				console.log('Successfully read file');
			};
			reader.onerror = function (err) {
				console.error('Failed to read file', err);
			};
		}

	}

	// ********************************
	// console.log(`input change, e `, e)
	// let files = input.files;
	// if (files.length == 0) return;

	// /* If any further modifications have to be made on the
	// Extracted text. The text can be accessed using the
	// file variable. But since this is const, it is a read
	// only variable, hence immutable. To make any changes,
	// changing const to var, here and In the reader.onload
	// function would be advisible */
	// const file = files[0];
	// let reader = new FileReader();
	// reader.onload = (e) => {
	//     const file = e.target.result;

	//     // This is a regular expression to identify carriage
	//     // Returns and line breaks
	//     const lines = file.split(/\r\n|\n/);
	//     textarea.value = lines.join('\n');

	// };
	// reader.onerror = (e) => alert(e.target.error.name);
	// reader.readAsText(file);
	// console.log(`TEST QUOTE PARSER`)
	// }
</script>

<input class="input input-secondary" id="fileInput" type="file" bind:files={input_file} on:change={parseInput(input_file)} />
