import Config from './config'
import Canvas from './canvas'
import Chrono from './chrono'
import Player from './player'
import Labyrinth from './labyrinth'

export default class Game {
    
    labyrinth: Labyrinth = new Labyrinth()
    canvas: Canvas = new Canvas(this.labyrinth)
    chrono: Chrono = new Chrono()
    players: Player[] = []

    constructor () {
        window.addEventListener('resize', this.resize)
        this.resize()
    }

    resize = () => {
        this.canvas.canvas.width = window.innerWidth/2 - 4
        this.canvas.canvas.height = window.innerHeight/2 - 4
        this.canvas.orientation = this.canvas.canvas.width >= this.canvas.canvas.height ? 'landscape' : 'portrait'
        this.canvas.draw()
    }

}