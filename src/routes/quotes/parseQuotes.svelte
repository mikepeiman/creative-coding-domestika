<script>
	// var el = document.createElement('html');
	// // el.innerHTML = ""
	// el.getElementsByTagName('a'); // Live NodeList of your anchor elements
import {onMount} from 'svelte'

onMount(() => {
    let input = document.querySelector('#fileInput');
	let textarea = document.querySelector('#quotesTextarea');
//  parseInput()
})

function parseInput(fileInput) {

    if(fileInput?.files?[0] == undefined) {
                return ;
            }


            // Example of what information you can read
            // var filename = fileInput.files[0].name;
            // var filesize = fileInput.files[0].size;
            var reader = new FileReader();
            reader.onload = function(event) {
                var content = event.target.result; // content is a string
                console.log("Successfully read file");
            };
            reader.onerror = function(err) {
                console.error("Failed to read file", err);
            }
            reader.readAsText(fileInput.files[0]);
        }
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 36 ~ parseInput ~ fileInput`, fileInput)

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

<input id="fileInput" type="file" on:change={parseInput(this)} />

