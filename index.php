<?php

    require './controller/FrontofficeController.php';
    $frontoffice_controller = new Frontoffice_Controller;

    require 'views/frontend/header.php';

    try
    {
        // views for landing page (unregistered)
        if (!isset($_GET['action'])) {
            $frontoffice_controller->displayUnregisteredLandingPage();
        }

        elseif (isset($_GET['action'])) {

            // views for show details page
            if ($_GET['action'] === 'getShowDetails' && isset($_GET['id']) && isset($_GET['type'])) {
                $frontoffice_controller->displayShowDetailsTemplate();
            }

            // views for artist details page
            elseif ($_GET['action'] === 'getArtistDetails' && isset($_GET['id'])) {
                require 'views/frontend/image_layer.php';
                require 'views/frontend/artist_details.php';
            }

            elseif ($_GET['action'] === 'searchContent') {
                require './controller/FrontendController.php';
                $frontend_Controller = new Frontend_Controller;
                $frontend_Controller->getContentSearch();
            }

            elseif ($_GET['action'] === 'getSearchResults') {
                require './controller/FrontendController.php';
                $frontend_Controller = new Frontend_Controller;
                $frontend_Controller->displaySearchResults();
            }
        }
    }

    catch(Exception $e) {
        echo 'Erreur : ' . $e->getMessage();
    }

    require 'views/frontend/footer.php';

?>