class AnimationShow extends Show {
    constructor () {
        super()
        console.log(`L'objet AnimationShow a bien été instancié.`)
        // console.log(`Le titre de la série demandée est : ${animationShow.name}.`)
        // console.log(`${this.constructor.name} est le nom de ma classe`)
    }

    displayContent() {
        console.log(`J'affiche le contenu de l'objet AnimationShow dans ma page`)
    }
}