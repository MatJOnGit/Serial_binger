<?php

    require_once 'Controller.php';
    
    class Frontoffice_Controller extends Controller {
        public $emailRegex = '#^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$#';
        
        public $passwordRegex = '#^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$#';

        // Calls the right nav bar view based on the 'status' session data
        public function displayMenu() {
            // test sur la session en cours pour afficher les bonnes vues

            // si l'utilisateur n'est pas authentifié, afficher un menu avec un bouton pour se logger / s'inscrire
            // $this->displayUnregisteredUserMenu();

            // sinon, afficher un menu permettant de se déconnecter
            // $this->displayRegisteredUserMenu();
        }

        /* Calls a landing page display based on the session data */
        public function displayLandingPage() {
            // test sur la session en cours pour afficher les bonnes vues

            // si l'utilisateur n'est pas authentifié, afficher une page d'acceuil
            $this->displayWelcomePage();
            
            // sinon, afficher le catalogue
            // $this->displayCatalogue();
        }

        /* Renders a list of shows to watch */
        public function displaySuggestionPage() {
        }

        /* Renders an app presentation (the user is unknown) */
        public function displayWelcomePage() {
            require './views/frontoffice/image_layer.php';
            require './views/frontoffice/app_presentation.php';
        }

        /* Renders show details for the id and type in url */
        public function displayShowDetails() {
            require './views/frontoffice/image_layer.php';
            require './views/frontoffice/show_details.php';
        }

        /* Tests searched-content post data to avoid script injection */
        public function getContentSearch() {
            if (isset($_POST['searched-content'])) {
                header('Location: index.php?action=getSearchResults&research=' . $_POST['searched-content']);
            }
            // else {
                // On affichera une page de résultat non trouvé
            // }
        }

        /* Renders results based on the header form request */
        public function displaySearchResults() {
            require './views/frontoffice/search_results.php';
        }

        /* Renders artist details for the id in url */
        public function displayArtistDetails() {
            require './views/frontoffice/artist_details.php';
        }
    }