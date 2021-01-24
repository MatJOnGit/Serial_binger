<div class='content-block'>
    <div class='main-content' id='<?php echo $_GET['id'] ?>'>    
        <section class='artist-headers'>    
            <div class='artist-desc'>
                <h5>Nom :</h5>
                <p class='artist-name'></p>
                <h5>Naissance :</h5>
                <p><span class='birthday'></span> - <span class='birthplace'></span>
                </p>
            </div>

            <div class='artist-picture'>
            </div>
        </section>

        <div class='biography-block'>
            <p class='artist-bio'></p>
        </div>

        <div class='splitter'>
        <span class='splitter-underline'></span>
        <img src='./../../assets/images/icons/logo-serial-binger.png' class='transformed-logo' />
        <span class='splitter-underline'></span>
    </div>

        <div class='shows-credits'>
            <h5>Films :</h5>
            <ul class='movies-list'></ul>
            <h5>Séries :</h5>
            <ul class='tv-shows-list'></ul>
        </div>

        <script src='./../../assets/js/Layer.model.js'></script>

        <script src='./../../assets/js/Show.model.js'></script>
        <script src='./../../assets/js/Artist.model.js'></script>

        <script src='./../../assets/js/MoviesSlider.js'></script>
        <script src='./../../assets/js/TvShowsSlider.js'></script>

        <script src='./../../assets/js/DetailsPageContent.js'></script>
        <script>
            window.addEventListener('load', () => {
                let detailsPageContent = new DetailsPageContent('person')
                detailsPageContent.initContent()
            })
        </script>
    </div>