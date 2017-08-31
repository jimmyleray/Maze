import Config from './config'
import Chrono from './chrono'
import Player from './player'
import Labyrinth from './labyrinth'

export default class Game {
    
    labyrinth: Labyrinth
    chrono: Chrono = new Chrono()
    players: Player[] = []

    constructor () {
        window.addEventListener('resize', this.init)
        this.init()
    }

    init = () => {
        // Remove all children of the main game container
        const container = document.getElementById('game')
        while (container.firstChild) container.removeChild(container.firstChild)

        // Create the Labyrinth
        this.labyrinth = new Labyrinth()

        // Reset and add new players
        this.players = []
        this.addPlayer('Albard')
        this.addPlayer('Aziliz')
    }

    addPlayer = (name: string) => { this.players.push(new Player(this.labyrinth, this.players.length, this.players.length, name)) }

}