<script>
    let icons = [
        {name: 'Github', src: ''}
    ]

</script>

<div class="footer w-screen grid bg-gradient-to-r from-gray-700 to-indigo-500 flex align-middle items-center justify-between">
    <button class="logo btn btn-outline place-content-center mx-5 p-5 rounded-lg bg-blue-700">Footer</button>
    <nav class="social w-full flex items-center justify-center">
        <p>This is the footer text. Made by Mike Peiman.</p>
        <!-- <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/creative">Creative</a> -->
    </nav>
</div>

<style lang="scss">
    :global(.footer) {
        grid-area: footer;
        display: grid;
        grid-template-areas:
        'logo social end';
        grid-template-columns: 10rem 1fr 10rem;
    }

    .logo {
        grid-area: logo;
    }
    nav {
        grid-area: social;
        padding-left: 10rem;
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