class DetailsPageContent {
    constructor() {
        console.log(`Call d'une nouvelle page de détails.`)
        this._contentReferences = document.getElementsByClassName('main-content')[0].id
        this._contentType = this.contentReferences.split('-')[0]
        this._contentId = this.contentReferences.split('-')[1]

        this._key = `9681493c16e2c16cba85aee9de76d451`
        this._defaultResponseTongue = `fr-FR`
        this._backupResponseTongue = `us-US`
    }

    get contentReferences() { return this._contentReferences }
    get contentType() { return this._contentType }
    get contentId() { return this._contentId }
    get key() { return this._key }
    get defaultResponseTongue() { return this._defaultResponseTongue }
    get backupResponseTongue() { return this._backupResponseTongue }

    requestSpecificContent() {
        console.log(`Récupérons tout d'abord les informations que l'on a sur la requête`)
        console.log(`Nous allons afficher le content de type ${this.contentType} et la référence ${this.contentId}`)
        console.log(`On va donc effectuer une requête à l'API.`)
        this.requestSpecificContent()
    }

    requestSpecificContent() {
        fetch(`https://api.themoviedb.org/3/${this.contentType}/${this.contentId}?api_key=${this.key}&language=${this.defaultResponseTongue}&append_to_response=credits,videos`)
        .then(response => response.json())
        .then(contentData => this.initContent(contentData))
        .catch(error => console.log(error))
    }

    initContent(contentData) {
        console.log(`Ici, on initialise un objet pour display un layer specifique`)
        let contentLayer = new Layer(contentData)
        contentLayer.renderItem()

        console.log(`Puis on va appeler un objet pour display le content`)
        if (this.contentType === `movie`) {
            console.log(`On va donc instancier un objet Movie`)
            let movie = new Movie(contentData)
            movie.renderContent()
        }
        else if (this.contentType === `tv`) {
            console.log(`On va donc instancier un objet TVShow`)
            let tvShow = new TVShow(contentData)
            tvShow.renderContent()
        }
        else if (this.contentType === 'artist') {
            console.log(`On va donc instancier un objet Artist`)
            let artist = new Artist(contentData)
            artist.renderContent()
        }
    }
}