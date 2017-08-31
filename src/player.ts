import Config from './config'
import Canvas from './canvas'
import Cell from './cell'
import Labyrinth from './labyrinth'

export default class Player {

    id: number
    name: string
    speed: number
    labyrinth: Labyrinth
    size: number = Config.playerSize
    config: number
    moves : boolean[] = [false, false, false, false]
    history: number[][] = []
    loopID: number | undefined
    canvas: Canvas
    x: number
    y: number

    constructor (
        labyrinth: Labyrinth, 
        id: number, 
        config: number = 0,
        name: string = undefined, 
        x: number = 0, 
        y: number = 0
    ) {
        this.id = id, this.labyrinth = labyrinth, this.config = config
        this.x = this.labyrinth.cellSize*(0.5 + this.randInt(0, this.labyrinth.width - 1))
        this.y = this.labyrinth.cellSize*(0.5 + this.randInt(0, this.labyrinth.height - 1))
        this.name = name ? name : 'Player ' + (id + 1).toString()
        this.canvas = new Canvas(this.id.toString())
        this.controls()
        this.start()
    }

    loop = () => {
        this.start()
        this.move()
        this.draw()
    }

    start = () => { this.loopID = window.requestAnimationFrame(this.loop) }
    stop = () => { if (this.loopID) window.cancelAnimationFrame(this.loopID) }

    controls = () => {
        document.addEventListener('keydown', e => { 
            if (e.keyCode == Config.playersControls[this.config][0]) this.moves[0] = true
            if (e.keyCode == Config.playersControls[this.config][1]) this.moves[1] = true
            if (e.keyCode == Config.playersControls[this.config][2]) this.moves[2] = true
            if (e.keyCode == Config.playersControls[this.config][3]) this.moves[3] = true
        })
        document.addEventListener('keyup', e => { 
            if (e.keyCode == Config.playersControls[this.config][0]) this.moves[0] = false
            if (e.keyCode == Config.playersControls[this.config][1]) this.moves[1] = false
            if (e.keyCode == Config.playersControls[this.config][2]) this.moves[2] = false
            if (e.keyCode == Config.playersControls[this.config][3]) this.moves[3] = false
        })
    }

    draw = () => {
        this.canvas.clear()
        /*
        this.history.map((data, i) => {
            if (this.history[i+1]) this.canvas.line(Config.playersColors[this.id].substr(0,20) + '0.25)', 2, data[0], data[1], this.history[i+1][0], this.history[i+1][1])
        })
        */
        this.canvas.circle(Config.playersColors[this.id], 1, this.x, this.y, this.size)
        this.canvas.circle(Config.backgroundColor, 1, this.x, this.y, this.size - 1)
        this.canvas.circle(Config.playersColors[this.id].substr(0,20) + '0.5)', 1, this.x, this.y, this.size - 1)
        //this.canvas.font(this.name, Config.playersColors[this.id].substr(0,20) + '0.5)', this.x + 2*this.size, this.y + this.size)
    }

    move = () => {
        const cell = this.getActualCell()
        if (this.moves[0]) {
            if ((this.y - this.size - Config.wallsWidth/2) % this.labyrinth.cellSize == 0) {
                if (!cell.walls[0]) this.y--
            } else {
                this.y--
            }
        }
        if (this.moves[1]) {
            if ((this.x + this.size) % this.labyrinth.cellSize == this.labyrinth.cellSize - 1) {
                if (!cell.walls[1]) this.x++
            } else {
                this.x++
            }
        }
        if (this.moves[2]) {
            if ((this.y + this.size) % this.labyrinth.cellSize ==  this.labyrinth.cellSize - 1) {
                if (!cell.walls[2]) this.y++
            } else {
                this.y++
            }
        }
        if (this.moves[3]) {
            if ((this.x - this.size - Config.wallsWidth/2) % this.labyrinth.cellSize == 0) {
                if (!cell.walls[3]) this.x--
            } else {
                this.x--
            }
        }
        //this.history.unshift([this.x, this.y])
        //this.history = this.history.splice(0, Config.tailSize)
    }

    getActualCell = (): Cell => this.labyrinth.grid[Math.floor(this.y / this.labyrinth.cellSize)][Math.floor(this.x / this.labyrinth.cellSize)]
    
    randInt = (min: number, max: number): number => Math.floor(Math.random()*(max - min + 1)) + min
}