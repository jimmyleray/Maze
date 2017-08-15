import Config from './config'
import Canvas from './canvas'
import Chrono from './chrono'

interface Player {
    name: string
    canvas: Canvas
}

export default class Game {
    
    players: Array<Player> = []
    chrono = new Chrono()

    init = () => {
        this.addPlayer('Albard')
        this.addPlayer()
        this.addPlayer()
        this.addPlayer()
        this.chrono.start()
        this.render()
    }

    addPlayer = (name: string = 'Player') => {
        const node = document.createElement('canvas')
        node.id = 'player-' + this.players.length
        node.style.borderColor = Config.playersColors[this.players.length]
        document.getElementById('game').appendChild(node)
        this.players.push({ name: name, canvas: new Canvas(node.id) })
    }

    removePlayer = (id: number) => {
        const list = document.getElementById('game')
        list.removeChild(list.childNodes[id])
        this.players[id].canvas = null
        this.players.slice(id, 0)
    }

    render = () => {
        this.players.map((player, id) => player.canvas.background(id))
        requestAnimationFrame(this.render)
    }

}