<?php

    require 'views/frontend/header.php';

    try
    {
        // views for landing page (unregistered) 
        if (!isset($_GET['action'])) {
            require 'views/frontend/image_layer.php';
            require 'views/frontend/app_presentation.php';
        }

        elseif (isset($_GET['action'])) {

            // views for show details page
            if ($_GET['action'] === 'getShowDetails' && isset($_GET['id']) && isset($_GET['type'])) {
                require 'views/frontend/image_layer.php';
                require 'views/frontend/show_details.php';
            }

            // views for artist details page
            elseif ($_GET['action'] === 'getArtistDetails' && isset($_GET['id'])) {
                require 'views/frontend/image_layer.php';
                require 'views/frontend/artist_details.php';
            }
        }
    }

    catch(Exception $e) {
        echo 'Erreur : ' . $e->getMessage();
    }

    require 'views/frontend/footer.php';

?>