<script context="module">
	export const load = async ({ fetch, page: { params } }) => {
		const { slug } = params;
		const res = await fetch(`/posts/${slug}.json`);
		if (res.ok) {
			const { post } = await res.json();
			return { props: { post } };
		}
	};
</script>

<script>
	// import Posts from "$components/Posts.svelte";
	export let post;
	const {
		title,
		date,
		tags,
		author: { name, authorTitle, picture },
		content: { html },
		coverImage
	} = post;
</script>

<svelte:head>
	<title>Mike's Blog</title>
</svelte:head>

<div class="flex flex-col content-center items-center">
    <div class="sm:-mx-5 md:-mx-10 lg:-mx-20 xl:-mx-38 mb-5 rounded-xl">
        <img src={post.coverImage.url} alt={`Cover image for ${title}`} />
    </div>
    <h1 class="text-4xl font-semibold mb-5">
        {title}
        <!-- {author.picture.url} -->
    </h1>
    <a href="/" class="inline-flex items-center mb-3">
        <img
            src={picture.url}
            alt={name}
            class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
        />
        <span class="flex-grow flex flex-col pl-4">
            <span class="title-font font-medium">{name}</span>
            <span class="text-secondary text-xs tracking-widest mt-0 5">{authorTitle}</span>
        </span>
    </a>
    <p class="text-secondary text-xs tracking-widest font-semibold">{new Date(date).toDateString()}</p>
    {#if tags}
        <div class="mt-5 space-x-2">
            {#each tags as tag}
                <span class="badge badge-primary">{tag}</span>
            {/each}
        </div>
    {/if}
    
    <article class="prose">
        {@html html}
    </article>
</div>
