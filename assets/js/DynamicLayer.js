class DynamicLayer extends Layer {
    constructor() {
        super()
        this._showTypes = ['movie', 'tv']
        this._randomTypeValue = Math.floor(Math.random()*this.showTypes.length)
        this._randomShowType = this.showTypes[this.randomTypeValue]
        this._randomShowIndex = Math.floor(Math.random()*20)
        this._displayedBackgroundAddress
    }

    get showTypes() { return this._showTypes }
    get randomTypeValue() { return this._randomTypeValue }
    get randomShowType() { return this._randomShowType }
    get randomShowIndex() { return this._randomShowIndex }
    get displayedBackgroundAddress() { return this._displayedBackgroundAddress }

    set randomShowIndex(data) { this._randomShowIndex = data }
    set displayedBackgroundAddress(data) { this._displayedBackgroundAddress = data }

    setBackgroundAddress(shows) {
        if (shows.results[this.randomShowIndex].backdrop_path !== null) {
            this.displayedBackgroundAddress = `url('${super.backgroundBaseURL}${shows.results[this.randomShowIndex].backdrop_path}')`
        }
        else {
            this.displayedBackgroundAddress = `url('${super.backgroundBaseURL}${shows.results[0].backdrop_path}')`
        }
    }

    setAlternativeBackground(shows) {
        setInterval(() => {
            this.randomShowIndex = Math.floor(Math.random()*20)
            this.setBackgroundAddress(shows)
            super.renderBackground(this.displayedBackgroundAddress)
        }, 10000)
    }

    requestPopularShows() {
        fetch(`https://api.themoviedb.org/3/discover/${this.randomShowType}?api_key=${this.key}&language=${this.defaultResponseTongue}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
        .then(response => response.json())
        .then(content => {
            this.initBackgroundRendering(content)
            return content
        })
        .catch(error => console.log(error))
    }

    initBackgroundRendering(shows) {
        this.setBackgroundAddress(shows)
        this.renderBackground(this.displayedBackgroundAddress)
        this.setAlternativeBackground(shows)
    }
}