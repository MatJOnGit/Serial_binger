<?php
session_start();
?>

<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- SEO -->
    <meta name="description" content="Serial Binger">
    <meta name="keyworks" content="tv show, série tv, serial, binger, amazon, netflix">
    <meta name="author" content="Mathieu Jourdan">
    
    <!-- Social metas -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="http://www.projet5.m-jourdan.fr">
    <meta property="og:title" content="Serial Binger, votre assistant de binge watching">
    <meta property="og:description" content="Trouvez LE film ou série TV qui vous correspond en quelques clics.">
    <meta property='og:creator' content="@Serial_Binger"/>
    <meta property="og:image" content=".assets/img/social_medias/wolf_social_medias.jpg">
    <meta property="og:locale" content="fr_FR">
    
    <meta name="twitter:title" content="Serial Binger, votre assistant de binge watching">
    <meta name="twitter:description" content="Trouvez LE film ou série TV qui vous correspond en quelques clics.">
    <meta name="twitter:url" content="http://www.projet5.m-jourdan.fr">
    <meta name="twitter:creator" content="@Serial_Binger">
    <meta name="twitter:image" content=".assets/img/social_medias/wolf_social_medias.jpg">

    <!-- CSS and fonts -->
    <link rel='stylesheet' href='./assets/css/normalize.css' type='text/css'>
    <link rel='stylesheet' href='./assets/css/style.css' type='text/css'>
    
    <!-- Fontawesome icons and favicon -->
    <link rel='stylesheet' href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css' integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p' crossorigin='anonymous'/>
    <link rel='icon' type='image/png' href='./../assets/images/icons/logo-serial-binger.png'>
    
    <title>Serial Binger, votre assistant de binge watching</title>
</head>
<body>
    <div id='wrapper'>
        <header>
            <a href='index.php'>
                <img src='./../../assets/images/icons/logo-serial-binger.png' alt='serial binger logo'/>
            </a>
            <form action='index.php?action=searchContent' method='post'>
                <input type='text' placeholder='Recherche...' name='searched-content' required />
                <button type='submit'><i class='fa fa-search'></i></button>
            </form>
            <div id='menu'>
                <i class='fas fa-2x fa-bars'></i>
            </div>
        </header>