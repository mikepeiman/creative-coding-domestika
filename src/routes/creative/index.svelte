<script>
    import {onMount} from 'svelte'
    let canvas, context
    onMount(() => {
        canvas = document.querySelector('canvas')
        context = canvas.getContext('2d')
        context.fillRect(100,100,400,400)
    })
    
    
    </script>
    
    <div class="flex flex-col content-center items-center w-full">
        <h1 class="text-sky-900 w-full text-center text-3xl bold">Creative Coding</h1>
        <div class="flex w-full items-center justify-center m-12">
            <canvas class="border-2 border-yellow-600" width="600" height="600"></canvas>
        </div>
    </div>