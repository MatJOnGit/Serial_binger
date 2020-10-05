class Movie {
    constructor (movie) {
        console.log(`L'objet Film a été instancié.`)
        console.log(`Le titre du film demandée est : ${movie.title}.`)
        console.log(`${this.constructor.name} est le nom de ma classe`)
    }
}