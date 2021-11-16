<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/todos.json');
		if (res.ok) {
			const { todos } = await res.json();
			return { props: { todos } };
		}
	};
</script>

<script>
	export let todos;
</script>

<svelte:head>
	<title>Mike's Blog</title>
</svelte:head>

{#each todos as {author, themes, body}}
<main class="container max-w-xl mx-auto px-4">
    <div class="card text-center shadow-2xl mb-20">
        <figure class="px-10 pt-10">
            <!-- <img class="rounded-xl" src="{coverImage.url}" alt="{`Cover image for ${title}`}"> -->
        </figure>
        <div class="card-body">
            <h1 class="title">{body}</h1>
            <p>{author.name}</p>
            <div class="flex justify-center mt-5 space-x-2">
                {#each themes as tag}
                    <div class="badge badge-primary">{tag.tag}</div>
                {/each}
            </div>
            <div class="justify-center card-actions">
                <!-- <a href={`/posts/${slug}`} class="btn btn-primary btn-outline">Read &rArr</a> -->
            </div>
        </div>
    </div>
</main>
{/each}
