// This duck instances the correct object based on the show type ... for now

class Show {
    constructor(showData) {
        this._showData = showData
        this._showType = show_type
    }

    get showType() {
        return this._showType
    }

    get showData() {
        return this._showData
    }

    showInit() {
        console.log(`Ce show est un${this.showType === 'movie' ? ' film' : 'e série'}`)

        if (show_type === "movie") {
            console.log(`On va donc instancier un objet Movie`)
        } else if (show_type === "tv") {

            // by default, a tv show is NOT an animation show
            let isAnimationShow = false

            // if there is a genre is set at "Animation", reverse the boolean value of isAnimationShow
            for (const genreIndex in this.showData.genres) {
                if (`${this.showData.genres[genreIndex].name}` === `Animation`) {
                    isAnimationShow = !isAnimationShow
                }
            }

            if (isAnimationShow) {
                console.log(`On va donc instancier un objet AnimationShow`)
            } else {
                console.log(`On va donc instancier un objet TVShow`)
            }
        }
    }
    
}