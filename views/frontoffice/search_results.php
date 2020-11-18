<div class='content-block'>
    <div class='main-content'>
    
        <h1>Résultats correspondant à : <span>'<?php echo $_GET['research']; ?>'</span></h1>

        <ul class='search-menu'>
            <li class='movie-search active-search'>Films</li>
            <li class='tv-search inactive-search'>Séries</li>
            <li class='person-search inactive-search'>Artistes</li>
        </ul>

        <ul class='search-results-list'>
        </ul>

        <div class='paging-container'>
        </div>

        <script src='./../../assets/js/FilteredContentList.js'></script>
        <script src='./../../assets/js/FilteredMovieList.js'></script>
        <script src='./../../assets/js/FilteredTVShowList.js'></script>
        <script src='./../../assets/js/FilteredArtistList.js'></script>
        <script src='./../../assets/js/ContentSearch.js'></script>
        <script>
            window.addEventListener('load', () => {
                let contentSearch = new ContentSearch()
                contentSearch.initSearch()
            })
        </script>
    </div>