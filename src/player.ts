import Config from './config'
import Labyrinth from './labyrinth'
import Canvas from './canvas'
import Cell from './cell'

export default class Player {

    id: number
    config: number
    name: string
    speed: number
    labyrinth: Labyrinth
    size: number = Config.playerSize
    moves : boolean[] = [false, false, false, false]
    history: number[][] = []
    loopID: number | undefined
    hasFinished: boolean = false
    menu: HTMLElement
    canvas: Canvas
    x: number
    y: number

    constructor (
        labyrinth: Labyrinth, 
        id: number, 
        config: number = 0
    ) {
        this.id = id, this.labyrinth = labyrinth, this.config = config
        this.name = 'Player ' + (id + 1).toString()
        this.menu = document.getElementById('player_' + (this.id + 1).toString())
        this.menu.style.backgroundColor = Config.playersColors[this.id].substr(0,20) + '0.25)'
        this.controls()
        this.init()
    }

    init = () => {
        this.canvas = new Canvas(this.id.toString())
        this.x = this.labyrinth.cellSize*(0.5 + this.randInt(0, this.labyrinth.width - 1))
        this.y = this.labyrinth.cellSize*(0.5 + this.randInt(0, this.labyrinth.height - 1))
    }

    loop = () => {
        this.move()
        this.draw()
    }

    controls = () => {
        document.addEventListener('keydown', event => { 
            Config.playersControls[this.config].map((key, index) => {
                if (event.keyCode == key) this.moves[index] = true
            })
        })
        document.addEventListener('keyup', event => { 
            Config.playersControls[this.config].map((key, index) => {
                if (event.keyCode == key) this.moves[index] = false
            })
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
        if (cell.isEnd) {
            this.hasFinished = true
        } else {
            if (this.moves[0]) {
                if ((this.y - this.size - Config.wallsWidth/2) % this.labyrinth.cellSize == 0) {
                    if (!cell.walls[0]) this.y--
                } else { this.y-- }
            }
            if (this.moves[1]) {
                if ((this.x + this.size) % this.labyrinth.cellSize == this.labyrinth.cellSize - 1) {
                    if (!cell.walls[1]) this.x++
                } else { this.x++ }
            }
            if (this.moves[2]) {
                if ((this.y + this.size) % this.labyrinth.cellSize ==  this.labyrinth.cellSize - 1) {
                    if (!cell.walls[2]) this.y++
                } else { this.y++ }
            }
            if (this.moves[3]) {
                if ((this.x - this.size - Config.wallsWidth/2) % this.labyrinth.cellSize == 0) {
                    if (!cell.walls[3]) this.x--
                } else { this.x-- }
            }
            //this.history.unshift([this.x, this.y])
            //this.history = this.history.splice(0, Config.tailSize)
        }
    }

    getActualCell = (): Cell => this.labyrinth.grid[Math.floor(this.y / this.labyrinth.cellSize)][Math.floor(this.x / this.labyrinth.cellSize)]
    
    randInt = (min: number, max: number): number => Math.floor(Math.random()*(max - min + 1)) + min
}