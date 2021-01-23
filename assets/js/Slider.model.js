class Slider {
    constructor (casting) {
        
        /* Inherited elements */
        this._casting = casting
        
        /* Static values */
        this._maxDisplayedCards = 10

        /* Slider DOM elements */
        this._list = document.getElementsByClassName(`casting-list`)[0]

        console.log(`L'objet Slider a bien été instancié.`)
    }

    get casting() {
        return this._casting
    }

    get maxDisplayedCards() {
        return this._maxDisplayedCards
    }

    get list() {
        return this._list
    }

    renderCardsDetails(card) {
        const actorCard = document.createElement('li')
        const actorImgContainer = document.createElement('div')
        const actorImg = document.createElement('img')
        const actorLink = document.createElement('a')
        const actorLinkIcon = document.createElement('i')
        const cardTextBox = document.createElement('div')
        const actorRole = document.createElement('p')
        const actorName = document.createElement('p')

        actorCard.className = 'actor-card'
        actorImg.src = `https://image.tmdb.org/t/p/w500` + card.profile_path
        actorImg.alt = card.name
        actorLinkIcon.className = 'fas fa-link'
        actorRole.textContent = card.character
        actorName.textContent = card.name
        actorLink.href = 'index.php?action=getArtistDetails&id=' + card.id
        actorLink.className = 'actor-link'
        
        this.list.appendChild(actorCard)
        actorCard.appendChild(actorImgContainer)
        actorImgContainer.appendChild(actorImg)
        actorImgContainer.appendChild(actorLink)
        actorLink.appendChild(actorLinkIcon)
        actorCard.appendChild(cardTextBox)
        cardTextBox.appendChild(actorRole)
        cardTextBox.appendChild(actorName)
    }

    renderCards() {
        this.casting.forEach((card, index) => {
            if ((card.profile_path !== null) && (index < this.maxDisplayedCards)) {
                this.renderCardsDetails(card)
            }
        })
    }
}