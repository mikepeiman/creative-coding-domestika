<div class="main">
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/pokemon">Pokemon</a>
        <a href="/posts.json">Posts API</a>
        <a href="/posts">Blog</a>
        <a href="/todos">Todos</a>
    </nav>
</div>

<style lang="scss">
    nav {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-family: 'Montserrat', sans-serif;
        a {
            margin: 1em;
            text-decoration: none;
            font-weight: 500;
        }
    }

    h1 {
        font-size: 3rem;
        font-weight: 800;
        background: -webkit-linear-gradient(0deg, rgba(72,0,36,1) 0%,rgba(9,121,121,1) 25%, rgba(121,121,155,1) 50%, rgba(121,9,121,1) 75%, rgba(2,0,76,1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

</style>