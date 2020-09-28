<div class="main-content">
        <div class="show-card">
            <div class="show-header">
                <h1></h1>
            </div>

            <div class="show-user-actions">
                <div class="preshow-actions">
                    <button id="play-trailer-button">
                        <i class="fas fa-play"></i>
                        <p>Bande-annonce</p>
                    </button>
                    <button class="add-to-watchlist-button">
                        <i class="fas fa-list"></i>
                        <p>Ajouter à ma liste</p>
                    </button>
                </div>

                <div id="trailer-player">
                </div>

                <div class="broadcaster-block">
                    <p>Voir </p>
                    <button class="netflix-button">Netflix</button>
                </div>

                <!-- sur mobile, ce bouton fera pop un formulaire au milieu de l'écran -->
                <button class="show-overview-button">Noter </button>
            </div>

            <hr>

            <div class="show-info">
                <h2>A propos </h2>
                <div class="show_genre">
                    <h3>Genres :</h3>
                    <p></p>
                </div>

                <div class="show_length">
                    <h3></h3>
                    <p></p>
                </div>
                
                <div class="show_director">
                    <h3>Créateur :</h3>
                </div>
            </div>

            <hr>

            <div class="show-casting">
                <h2>Distribution :</h2>
                <ul class="casting-list"></ul>
            </div>
            <script src="./../../assets/js/trailer_displayer.js"></script>
            <script src="./../../assets/js/show_content_loader.js"></script>
        </div>