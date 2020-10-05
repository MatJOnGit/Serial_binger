<?php

    class Controller
    {
        public $usernameRegex = '#^(?=.{5,20}$)[a-zA-Z]+([_-]?[a-zA-Z0-9])*$#';
        
        /**
        *
        * displayCustomNavBar method tests the 'status' data in session and display the right nav bar view.
        *
        **/

        public function displayLandingPage() {
            // test sur la session en cours pour afficher les bonnes vues
        }

        public function displayUnregisteredLandingPage() {
            require 'views/frontend/image_layer.php';
            require 'views/frontend/app_presentation.php';
        }

        public function displayShowDetailsTemplate() {
            require 'views/frontend/image_layer.php';
            require 'views/frontend/show_details.php';
        }
    }