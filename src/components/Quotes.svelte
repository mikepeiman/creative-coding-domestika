<!-- <script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/todos.json');
		if (res.ok) {
			const { todos } = await res.json();
			return { props: { todos } };
		}
	};
</script> -->

<script>
	export let quotes;
</script>

<svelte:head>
	<title>Mike's Blog</title>
</svelte:head>
<main class="max-w-xl mx-auto px-4 flex flex-col w-1/3">
{#each quotes as {author, tags, quoteBody}}

    <div class="card text-center shadow-2xl mb-20">
        <figure class="px-10 pt-10">
            <!-- <img class="rounded-xl" src="{coverImage.url}" alt="{`Cover image for ${title}`}"> -->
        </figure>
        <div class="card-body">
            <h1 class="title">{quoteBody}</h1>
            <p>{author.name}</p>
            <div class="flex justify-center mt-5 space-x-2">
                {#each tags as tag}
                    <div class="badge badge-primary">{tag.tag}</div>
                {/each}
            </div>
            <div class="justify-center card-actions">
                <!-- <a href={`/posts/${slug}`} class="btn btn-primary btn-outline">Read &rArr</a> -->
            </div>
        </div>
    </div>

{/each}
</main>
