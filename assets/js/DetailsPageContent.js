class DetailsPageContent {
    constructor(type) {
        this._tmdbKey = `9681493c16e2c16cba85aee9de76d451`
        this._defaultResponseTongue = `fr-FR`
        this._backupResponseTongue = `us-US`

        this._contentReferences = document.getElementsByClassName('main-content')[0].id
        this._contentType = type
        this._contentId
    }

    get tmdbKey() { return this._tmdbKey }
    get defaultResponseTongue() { return this._defaultResponseTongue }
    get backupResponseTongue() { return this._backupResponseTongue }

    get contentReferences() { return this._contentReferences }
    get contentType() { return this._contentType }
    get contentId() { return this._contentId }

    set contentType(data) { this._contentType = data }
    set contentId(data) { this._contentId = data }

    initContent() {
        console.log('Ce contenu est une page de "' + this.contentType + '".')
        if (this.contentType === 'show') {
            this.contentType = this.contentReferences.split('-')[0]
            this.contentId = this.contentReferences.split('-')[1]
            this.requestShowContent()
        }
        else if (this.contentType === 'person') {
            this.contentId = this.contentReferences
            this.requestArtistContent()
        }
    }
    
    requestShowContent() {
        fetch(`https://api.themoviedb.org/3/${this.contentType}/${this.contentId}?api_key=${this.tmdbKey}&language=${this.defaultResponseTongue}&append_to_response=credits,videos`)
        .then(response => response.json())
        .then(contentData => {
            this.initLayer(contentData)
            this.initContentDetailsRendering(contentData)
        })
        .catch(error => console.log(error))
    }

    requestArtistContent() {
        fetch(`https://api.themoviedb.org/3/${this.contentType}/${this.contentId}?api_key=${this.tmdbKey}&language=${this.defaultResponseTongue}&append_to_response=translations,movie_credits,tv_credits,images`)
        .then(response => response.json())
        .then(contentData => this.initContentDetailsRendering(contentData))
        .catch(error => console.log(error))
    }

    initLayer(contentData) {
        let staticLayer = new Layer()
        staticLayer.initStaticBackgroundRendering(contentData, this.contentType)
    }

    initContentDetailsRendering(contentData) {
        if (this.contentType === `movie`) {
            let movie = new Movie(contentData)
            movie.renderContent()
        }
        else if (this.contentType === `tv`) {
            let tvShow = new TVShow(contentData)
            tvShow.renderContent()
        }
        else if (this.contentType === 'person') {
            let artist = new Artist(contentData)
            artist.renderContent()
        }
    }
}