import Config from './config'
import Game from './game'

export default class Chrono {

    game: Game
    startTime: Date
    diffTime: number = 0
    stopped: boolean = false

    constructor (game: Game) {
        this.game = game
        this.init()

        // Listen click on start button to start
        document.getElementById('versus').addEventListener('click', event => {
            event.stopPropagation()
            this.game.gameMod = 'versus'
            this.start(); this.game.start()
        })
        document.getElementById('coop').addEventListener('click', event => {
            event.stopPropagation()
            this.game.gameMod = 'coop'
            this.start(); this.game.start()
        })
        document.getElementById('chrono').addEventListener('click', event => {
            this.game.init()
        })
    }

    init = () => {
        document.getElementById('versus').innerHTML = 'Versus'
        document.getElementById('message').innerHTML = ' / '
        document.getElementById('coop').innerHTML = 'Coop'
        document.getElementById('seconds').innerHTML = ''
        document.getElementById('milliseconds').innerHTML = ''
    }

    start = () => {
        this.stopped = false
        this.startTime = new Date()
        this.actualize()
    }
    stop = () => {
        this.stopped = true
    }

    actualize = () => {
        this.diffTime = Math.abs(new Date().getTime() - this.startTime.getTime())
        if (!this.stopped) { requestAnimationFrame(this.actualize) }
        this.display()
    }

    display = () => {
        document.getElementById('versus').innerHTML = ''
        document.getElementById('message').innerHTML = ''
        document.getElementById('coop').innerHTML = ''
        document.getElementById('seconds').innerHTML = ((this.diffTime - this.diffTime % 1000) / 1000).toString() + 's '
        document.getElementById('milliseconds').innerHTML = ('00' + (this.diffTime % 1000).toString() + '0').slice(-4, -1)
    }
    
}