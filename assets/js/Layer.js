class Layer {
    constructor(layerType) {
        this._layerType = layerType
        this._showTypes = ['movie', 'tv']
        this._backgroundBaseURL = 'https://image.tmdb.org/t/p/w500'

        this._randomTypeValue = Math.floor(Math.random() * this.showTypes.length)
        this._randomShowType = this.showTypes[this.randomTypeValue]
        this._randomShowIndex = Math.floor(Math.random() * 20)

        this._showLayer = document.getElementsByClassName(`show_layer`)[0]
    }

    get layerType() { return this._layerType }
    get showTypes() { return this._showTypes }
    get backgroundBaseURL() { return this._backgroundBaseURL }
    get randomTypeValue() { return this._randomTypeValue }
    get randomShowType() { return this._randomShowType }
    get randomShowIndex() { return this._randomShowIndex }
    get showLayer() { return this._showLayer }

    set randomShowIndex(data) { this._randomShowIndex = data }

    generateBackground() {
        if (this.layerType === 'dynamic-layer') {
            this.requestPopularShows()
        }
    }

    requestPopularShows() {
        fetch(`https://api.themoviedb.org/3/discover/${this.randomShowType}?api_key=9681493c16e2c16cba85aee9de76d451&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
        .then(response => response.json())
        .then(shows => {
            this.initBackgroundRendering(shows)
            return shows
        })
        .catch(error => console.log(error))
    }

    initBackgroundRendering(shows) {
        this.renderBackground(shows)
        this.setAlternativeBackground(shows)
    }

    renderBackground(shows) {
        if (shows.results[this.randomShowIndex].backdrop_path !== null) {
            this.showLayer.style.backgroundImage = `url('${this.backgroundBaseURL}${shows.results[this.randomShowIndex].backdrop_path}')`
        }
    }

    setAlternativeBackground(shows) {
        setInterval(() => {
            this.randomShowIndex = Math.floor(Math.random()*20)
            this.renderBackground(shows)
        }, 10000)
    }
}