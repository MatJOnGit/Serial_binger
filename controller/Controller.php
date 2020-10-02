<?php

    class Controller
    {
        public $usernameRegex = '#^(?=.{5,20}$)[a-zA-Z]+([_-]?[a-zA-Z0-9])*$#';
        
        /**
        *
        * displayCustomNavBar method tests the 'status' data in session and display the right nav bar view.
        *
        **/
        
        protected function displayNavBar()
        {
            // if (isset($_SESSION['status']))
            // {
            //     if (($_SESSION['status'] === 'sAdmin') || ($_SESSION['status'] === 'admin'))
            //     {
            //         require 'view/backend/admin-nav-bar.php';
            //     }
            //     else
            //     {
            //         require 'view/frontend/member-nav-bar.php';
            //     }
            // }
            
            // else
            // {
            //     require './view/frontend/unregistered-nav-bar.php';
            // }
        }
    }