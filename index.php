<?php

    require 'views/frontoffice/header.php';

    require 'controllers/FrontofficeController.php';
    $frontoffice_controller = new Frontoffice_Controller;

    try {
        if (!isset($_GET['action'])) {
            $frontoffice_controller->displayLandingPage();
        }

        elseif (isset($_GET['action'])) {

            if ($_GET['action'] === 'getShowDetails' && isset($_GET['id']) && isset($_GET['type'])) {
                $frontoffice_controller->displayShowDetails();
            }

            elseif ($_GET['action'] === 'getArtistDetails' && isset($_GET['id'])) {
                $frontoffice_controller->displayArtistDetails();
            }

            elseif ($_GET['action'] === 'searchContent') {
                $frontoffice_controller->getContentSearch();
            }

            elseif ($_GET['action'] === 'getSearchResults') {
                $frontoffice_controller->displaySearchResults();
            }
        }
    }

    catch(Exception $e) {
        echo 'Erreur : ' . $e->getMessage();
    }

    require 'views/frontoffice/footer.php';

?>