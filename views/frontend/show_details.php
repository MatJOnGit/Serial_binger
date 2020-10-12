<div class="main-content">
    <div class="show-block" id="<?php echo $_GET['type'] ?>">
        <section class="show-header">
            <h1></h1>
            <p class="show-synopsis"></p>
        </section>

        <section class="show-user-actions">
            <div class="preshow-actions">
                <!-- classe no-trailer ou available-trailer suivant le cas. Le style sera à ajouter ... -->
                <button class="play-trailer-button">
                    <i class="fas fa-play"></i><p>Bande-annonce</p>
                </button>

                <button class="watchlist-button">
                    <i class="fas fa-list"></i>
                    <p>Ajouter à ma liste</p>
                </button>
            </div>

            <div class="trailer-player">
            </div>

            <div class="broadcaster-block">
                <p>Voir sur :</p>
                <button class="netflix-button">Netflix</button>
            </div>

            <!-- sur mobile, ce bouton fera pop un formulaire au milieu de l'écran -->
            <button class="show-overview-button" id="<?php echo $_GET['id']; ?>">Noter </button>
        </section>

        <div class="splitter">
            <span class="splitter-underline"></span>
            <img src='./../../assets/images/icons/logo-serial-binger.png' class="transformed-logo" />
            <span class="splitter-underline"></span>
        </div>

        <section class="show-info">
            <h2>A propos :</h2>

            <div>
                <h3 class="show-genre-title">Genres :</h3>
                <p class="show-genre-value">Non disponible</p>
            </div>

            <div>
                <h3 class="show-length-title">Durée du film :</h3>
                <p class="show-length-value">Non disponible</p>
            </div>
            
            <div class="show-directors-container">
                <h3 class="show-directors-title">Directeur :</h3>
                <p class="show-directors-name">Non disponible</p>
            </div>
        </section>

        <section class="show-casting">
            <h3>Distribution :</h2>
            <ul class="casting-list"></ul>
        </section>

        <script src="./../../assets/js/Slider.model.js"></script>
        <script src="./../../assets/js/Show.model.js"></script>
        <script src="./../../assets/js/Movie.model.js"></script>
        <script src="./../../assets/js/TVShow.model.js"></script>
        
        <script src="./../../assets/js/show_content_loader.js"></script>
    </div>