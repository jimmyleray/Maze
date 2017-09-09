import Config from './config'
import Chrono from './chrono'
import Player from './player'
import Labyrinth from './labyrinth'
declare const Synth: any

export default class Game {
    
    labyrinth: Labyrinth
    chrono: Chrono = new Chrono(this)
    loopID: number | undefined
    players: Player[] = []
    isFinished: boolean = false
    isStarted: boolean = false
    gameMod: string = 'versus'

    constructor () {

        // Add resize listener to restart the game
        window.addEventListener('resize', this.init)

        // Game initialisation
        this.init()

        // Listen to Enter key to add new players
        document.addEventListener('keyup', e => {
            if (e.keyCode == 13 && this.players.length < 4) this.addPlayer()
        })

    }

    // Function to initialize the game
    init = () => {

        // New game so not finished
        this.isFinished = false

        // Remove all children of the main game container
        const container = document.getElementById('game')
        while (container.firstChild) container.removeChild(container.firstChild)

        // Create the Labyrinth
        this.labyrinth = new Labyrinth()

        // Chrono initialisation
        this.chrono.init()

        // Add new player if there is none
        if (this.players.length == 0) this.addPlayer()
        // Update players for new game
        this.players.map(player => { player.labyrinth = this.labyrinth; player.hasFinished = false; player.init() })

    }

    // Main game loop
    loop = () => {

        // Render all players actions / moves
        this.players.map(player => player.loop())

        // if all players has finished, end the game and stop the chrono
        if (this.gameMod == 'versus' && this.players.filter(player => player.hasFinished).length > 0) { this.stop(); this.chrono.stop() }
        else if (this.gameMod == 'coop' && this.players.filter(player => !player.hasFinished).length == 0) { this.stop(); this.chrono.stop() }
        // Recall the start function
        // to loop with requestAnimation
        else { this.start() }

    }

    // Start and stop functions to control main game loop
    start = () => {
        this.isStarted = true
        this.loopID = window.requestAnimationFrame(this.loop)
    }

    stop = () => {
        new Audio(Synth.generate(0, 'C', 4, 1)).play()
        this.isFinished = true; this.isStarted = false
        if (this.loopID) window.cancelAnimationFrame(this.loopID)
        this.players.map(player => { player.canvas.clear(); player.drawHistory(); player.draw() })
    }

    // Function to add a player with a specific name
    addPlayer = () => { this.players.push(new Player(this.labyrinth, this.players.length, this.players.length)) }

}