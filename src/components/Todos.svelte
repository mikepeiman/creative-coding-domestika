<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/api/todos.json');
		if (res.ok) {
			const { todos } = await res.json();
			return { props: { todos } };
		}
	};
</script>

<svelte:head>
    <title>Mike's Blog</title>
</svelte:head>

<script>
    export let todos
</script>

{#each todos as {title, slug, excerpt, coverImage, date, tags}}
<main class="container max-w-xl mx-auto px-4">
    <div class="card text-center shadow-2xl mb-20">
        <figure class="px-10 pt-10">
            <img class="rounded-xl" src="{coverImage.url}" alt="{`Cover image for ${title}`}">
        </figure>
        <div class="card-body">
            <h1 class="title">{title}</h1>
            <p>{excerpt}</p>
            <div class="flex justify-center mt-5 space-x-2">
                {#each tags as tag}
                    <div class="badge badge-primary">{tag}</div>
                {/each}
            </div>
            <div class="justify-center card-actions">
                <a href={`/todos/${slug}`} class="btn btn-primary btn-outline">Read &rArr</a>
            </div>
        </div>
    </div>
</main>
{/each}
