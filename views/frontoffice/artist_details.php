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

        <section>
            <p class='artist-bio'></p>
        </section>

        <section class='movie-credits'>
        </section>

        <script src='./../../assets/js/Layer.model.js'></script>

        <script src='./../../assets/js/Show.model.js'></script>
        <script src='./../../assets/js/Artist.model.js'></script>

        <script src='./../../assets/js/Slider.model.js'></script>

        <script src='./../../assets/js/DetailsPageContent.js'></script>
        <script>
            window.addEventListener('load', () => {
                let detailsPageContent = new DetailsPageContent('person')
                detailsPageContent.initContent()
            })
        </script>
    </div>