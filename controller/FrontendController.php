<?php

class Frontend_Controller {

    public function getContentSearch() {
        if (isset($_POST['searched-content'])) {
            echo '<p>Le contenu recherché est : ' . $_POST['searched-content'] . '</p>';
            header('Location: index.php?action=getSearchResults&research=' . $_POST['searched-content']);
        } else {
            echo 'recherche non valide ...';
        }
    }

    public function displaySearchResults() {
        require './views/frontend/search_results.php';
    }
}