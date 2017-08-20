import Config from './config'
import Canvas from './canvas'
import Chrono from './chrono'
import Player from './player'
import Labyrinth from './labyrinth'

export default class Game {
    
    labyrinth: Labyrinth
    canvas: Canvas
    chrono: Chrono = new Chrono()
    players: Player[] = []
    loopID: number | undefined

    constructor () {
        window.addEventListener('resize', this.resize)
        this.resize()
    }

    resize = () => {
        this.stop()
        this.labyrinth = new Labyrinth()
        this.cleanPlayers()
        this.addPlayer('Albard')
        this.addPlayer('Aziliz')
        this.canvas = new Canvas(this.labyrinth, this.players)
        this.start()
    }

    render = () => { 
        this.canvas.draw()
        this.start()
    }

    start = () => { this.loopID = window.requestAnimationFrame(this.render) }
    stop = () => { if (this.loopID) window.cancelAnimationFrame(this.loopID) }

    addPlayer = (name: string) => { this.players.push(new Player(this.labyrinth, this.players.length, this.players.length, name)) }

    cleanPlayers = () => { this.players = [] }

}