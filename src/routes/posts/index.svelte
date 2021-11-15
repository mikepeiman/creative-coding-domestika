<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/posts.json');
		if (res.ok) {
			const { posts } = await res.json();
			return { props: { posts } };
		}
	};
</script>

<script>
	import Posts from "$components/Posts.svelte";
	export let posts
    console.log(`🚀 ~ file: index.svelte ~ line 14 ~ posts`, posts)


</script>

<div class="posts">
	<Posts {posts}/>
</div>