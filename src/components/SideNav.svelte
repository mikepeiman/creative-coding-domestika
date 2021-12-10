<div class="sidebar bg-amber-700" id="sideNav">
    <nav>
        <a href="/sketch01">Sketch 01</a>
        <a href="/sketch02">Sketch 02</a>
        <a href="/sketch03">Sketch 03</a>
        <a href="/sketch04">Sketch 04</a>
        <a href="/sketch05">Sketch 05</a>
        <a href="/sketch06">Sketch 06</a>
        <a href="/sketch07">Sketch 07</a>
        <a href="/sketch08">Sketch 08</a>
        <a href="/sketch09">Sketch 09</a>
        <a href="/sketch10">Sketch 10</a>

    </nav>
</div>

<style lang="scss">
    :global(.sidebar) {
        grid-area: sidebar;
        width: 10rem;
    }
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
                @apply bg-cyan-900 rounded-lg p-4;
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