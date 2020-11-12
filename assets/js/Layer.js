class Layer {
    constructor(layerType) {
        this._layerType = layerType
        this._showTypes = ['movie', 'tv']
        this._randomTypeValue = Math.floor(Math.random() * this.showTypes.length)
        this._randomShowType = this.showTypes[this.randomTypeValue]
        this._randomShowIndex = Math.floor(Math.random() * 20)
        this._showsCollection
        this._backgroundBaseURL = 'https://image.tmdb.org/t/p/w500'

        this._showLayer = document.getElementsByClassName(`show_layer`)[0]
    }

    get layerType() { return this._layerType }
    get showTypes() { return this._showTypes }
    get randomTypeValue() { return this._randomTypeValue }
    get randomShowType() { return this._randomShowType }
    get randomShowIndex() { return this._randomShowIndex }
    get showsCollection() { return this._showsCollection }
    get backgroundBaseURL() { return this._backgroundBaseURL }
    get showLayer() { return this._showLayer }

    set showsCollection(data) { this._showsCollection = data }
    set randomTypeValue(data) { this._randomTypeValue = data }
    set randomShowIndex(data) { this._randomShowIndex = data }

    renderLayerBackground(shows) {
        this.showsCollection = shows
        this.showLayer.style.backgroundImage = `url('${this.backgroundBaseURL}${shows.results[this.randomShowIndex].backdrop_path}')`
        this.setAlternativeLayerBackground(shows)
    }

    setAlternativeLayerBackground(shows) {
        setInterval(() => {
            this.randomTypeValue = Math.floor(Math.random() * this.showTypes.length)
            this.randomShowIndex = Math.floor(Math.random()*20)
            this.renderLayerBackground(shows)
        }, 10000);
    }

    requestPopularShows() {
        fetch(`https://api.themoviedb.org/3/discover/${this.randomShowType}?api_key=9681493c16e2c16cba85aee9de76d451&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
        .then(response => response.json())
        .then(shows => this.renderLayerBackground(shows))
        // inclure un return de "shows" pour pouvoir l'intégrer à la ligne 42 et 46 ?
        .catch(error => console.log(error))
    }

    renderAdequateLayer() {
        if (this.layerType === 'random') {
            this.requestPopularShows()
        }
    }
}