class DetailsPageContent {
    constructor() {
        this._contentReferences = document.getElementsByClassName('main-content')[0].id
        this._contentType = this.contentReferences.split('-')[0]
        this._contentId = this.contentReferences.split('-')[1]

        this._tmdbKey = `9681493c16e2c16cba85aee9de76d451`
        this._defaultResponseTongue = `fr-FR`
        this._backupResponseTongue = `us-US`
    }

    get contentReferences() { return this._contentReferences }
    get contentType() { return this._contentType }
    get contentId() { return this._contentId }
    get tmdbKey() { return this._tmdbKey }
    get defaultResponseTongue() { return this._defaultResponseTongue }
    get backupResponseTongue() { return this._backupResponseTongue }

    requestSpecificContent() {
        fetch(`https://api.themoviedb.org/3/${this.contentType}/${this.contentId}?api_key=${this.tmdbKey}&language=${this.defaultResponseTongue}&append_to_response=credits,videos`)
        .then(response => response.json())
        .then(contentData => this.initContent(contentData))
        .catch(error => console.log(error))
    }

    initContent(contentData) {
        console.log('Initialisation du contenu ...')
        this.initLayer(contentData)
        this.initContentTextCompletion(contentData)
    }

    initLayer(contentData) {
        let staticLayer = new Layer()
        staticLayer.initStaticBackgroundRendering(contentData)
    }

    initContentTextCompletion(contentData) {
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