<script>
    export let posts
    console.log(posts)
</script>


{#each posts as post}
    <h1>{post.title}</h1>
{/each}
