<div class="main" id="sideNav">
    <nav>
        <a class="bg-cyan-500" href="/sketch01">Sketch 01</a>
    </nav>
</div>

<style lang="scss">
    #sideNav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        font-family: 'Montserrat', sans-serif;
        a {
            margin: 1em;
            text-decoration: none;
            font-weight: 500;
        }

        nav {
            display: flex;
            flex-direction: column;
            a {
                background: var(--primary-color);
            }
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