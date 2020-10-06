class Movie extends Show {
    constructor (movieData) {
        super()
        console.log(`L'objet Movie a bien été instancié.`)
        // console.log(`Le titre du film demandée est : ${this.showType.title}.`)
        // console.log(`${this.constructor.name} est le nom de ma classe`)
    }

    displayContent() {
        console.log(`J'affiche le contenu de l'objet Movie dans ma page`)
    }
}