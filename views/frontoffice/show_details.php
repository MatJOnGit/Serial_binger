<div class='main-content' id='<?php echo $_GET['type'] . '-'. $_GET['id'] ?>'>
    <h1></h1>

    <section class='show-header'>    
        <p class='show-synopsis'></p>
    </section>

    <section class='show-user-actions'>
        
        <div class='show-buttons-container'>
            <button class='show-button trailer-button'>
                <div class='show-button-text'>
                    <p>Bande-annonce</p>
                </div>
                <div class='show-button-icon'>
                <i class='fas fa-play'></i>
                </div>
            </button>

            <button class='show-button'>
                <div class='show-button-text'>
                    <p>Ajouter à ma playlist</p>
                </div>
                <div class='show-button-icon'>
                    <i class='fas fa-clipboard-list'></i>
                </div>
            </button>
        </div>

        <div class='trailer-player'></div>

        <div class='show-buttons-container'>
            <button class='netflix-button'>Netflix</button>

            <!-- sur mobile, ce bouton fera pop un formulaire au milieu de l'écran -->
            <button class='show-button overview-button' id='<?php echo $_GET['id']; ?>'>
                <div class='show-button-text'>
                    <p>Attribuer une note</p>
                </div>
                <div class='show-button-icon'>
                    <i class="fas fa-star"></i>
                </div>
            </button>
        </div>
    </section>

    <div class='splitter'>
        <span class='splitter-underline'></span>
        <img src='./../../assets/images/icons/logo-serial-binger.png' class='transformed-logo' />
        <span class='splitter-underline'></span>
    </div>

    <section class='show-info'>
        <h3>A propos :</h3>

        <div>
            <h4 class='show-genre-title'>Genres :</h4>
            <p class='show-genre-value'>Non disponible</p>
        </div>

        <div>
            <h4 class='show-length-title'>Durée du film :</h4>
            <p class='show-length-value'>Non disponible</p>
        </div>
        
        <div class='show-directors-container'>
            <h4 class='show-directors-title'>Directeur :</h4>
            <p class='show-directors-name'>Non disponible</p>
        </div>

        <div class='show-casting'>
            <h4>Distribution :</h4>
            <ul class='casting-list'></ul>
        </div>
    </section>

    <script src='./../../assets/js/Layer.model.js'></script>

    <script src='./../../assets/js/Show.model.js'></script>
    <script src='./../../assets/js/Movie.model.js'></script>
    <script src='./../../assets/js/TVShow.model.js'></script>

    <script src='./../../assets/js/Slider.model.js'></script>

    <script src='./../../assets/js/DetailsPageContent.js'></script>
    <script>
        window.addEventListener('load', () => {
            let detailsPageContent = new DetailsPageContent()
            detailsPageContent.requestSpecificContent()
        })
    </script>
</div>