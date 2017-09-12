import Config from './config'
import Labyrinth from './labyrinth'
import Canvas from './canvas'
import Cell from './cell'
declare const hyperapp: any

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
    gamePadFlag: boolean = false
    gamePadIdx: number
    x: number
    y: number

    constructor (labyrinth: Labyrinth, id: number, config: number = 0) {
        this.id = id, this.labyrinth = labyrinth, this.config = config
        this.name = 'Player ' + (id + 1).toString()

        hyperapp.app({
            state: { id: this.id },
            view: (state: any) => hyperapp.h('div', {
                class: 'menu-player player_background player_' + (state.id + 1).toString()
            })
        })

        hyperapp.app({
            state: { id: this.id, name: this.name },
            view: (state: any) => hyperapp.h('div', {
                class: 'menu-player player_' + (state.id + 1).toString()
            }, state.name)
        })

        this.controls()
        this.init()
    }

    init = () => {
        this.history = []
        this.canvas = new Canvas(this.id.toString())
        this.x = this.labyrinth.cellSize*(0.5 + this.randInt(0, this.labyrinth.width - 1))
        this.y = this.labyrinth.cellSize*(0.5 + this.randInt(0, this.labyrinth.height - 1))
    }

    loop = () => {
        if (this.gamePadFlag) this.gamepadControls(this.gamePadIdx)
        this.move()
        this.canvas.clear()
        this.draw()
    }

    controls = () => {
        if (Config.playersControls[this.config].split('-')[0] == 'keyboard') {
            const touch = Config.playersControls[this.config].split('-')[1] == '1' ? [38, 39, 40, 37] : [90, 68, 83, 81]
            document.addEventListener('keydown', event => { 
                touch.map((key, index) => {
                    if (event.keyCode == key) this.moves[index] = true
                })
            })
            document.addEventListener('keyup', event => { 
                touch.map((key, index) => {
                    if (event.keyCode == key) this.moves[index] = false
                })
            })
        } else {
            this.gamePadIdx = parseInt(Config.playersControls[this.config].split('-')[1])
            this.gamePadFlag = true
        }
    }

    gamepadControls = (idx: number) => {
        const gamepad = navigator.getGamepads()[idx]
        this.moves = [false, false, false, false]
        if (gamepad.axes[0] < -0.7) this.moves[3] = true
        if (gamepad.axes[1] > 0.7) this.moves[2] = true
        if (gamepad.axes[0] > 0.7) this.moves[1] = true
        if (gamepad.axes[1] < -0.7) this.moves[0] = true
    }

    draw = () => {
        this.canvas.circle(Config.playersColors[this.id], 1, this.x, this.y, this.size)
        this.canvas.circle(Config.backgroundColor, 1, this.x, this.y, this.size - 1)
        this.canvas.circle(Config.playersColors[this.id].substr(0,20) + '0.5)', 1, this.x, this.y, this.size - 1)
        //this.canvas.font(this.name, Config.playersColors[this.id].substr(0,20) + '0.5)', this.x + 2*this.size, this.y + this.size)
    }

    drawHistory = () => {
        this.history.map((data, i) => {
            if (this.history[i+1]) this.canvas.line(Config.playersColors[this.id].substr(0,20) + '0.25)', 2, data[0], data[1], this.history[i+1][0], this.history[i+1][1])
        })
    }

    move = () => {
        const cell = this.getCell(this.x, this.y)
        if (cell.isEnd) {
            this.hasFinished = true
        } else {
            let x_target = this.x
            let y_target = this.y
            if (this.moves[0]) y_target--
            if (this.moves[1]) x_target++
            if (this.moves[2]) y_target++
            if (this.moves[3]) x_target--
            if (this.legalMove(x_target, y_target)) {
                this.x = x_target
                this.y = y_target
            }
            this.history.unshift([this.x, this.y])
        }
    }

    getCell = (x: number, y:number): Cell => this.labyrinth.grid[Math.floor(y / this.labyrinth.cellSize)][Math.floor(x / this.labyrinth.cellSize)]
    
    legalMove = (x: number, y: number): boolean => {
        const target = this.getCell(x, y)
        if (x % this.labyrinth.cellSize <= Config.wallsWidth) {
            if (y % this.labyrinth.cellSize <= Config.wallsWidth) {
                return !target.walls[0] && !target.walls[3] // top-left
            } else if (y % this.labyrinth.cellSize >= this.labyrinth.cellSize - Config.wallsWidth) {
                return !target.walls[2] && !target.walls[3] // bottom-left
            } else { return !target.walls[3] } // left
        } else if (x % this.labyrinth.cellSize >= this.labyrinth.cellSize - Config.wallsWidth) {
            if (y % this.labyrinth.cellSize <= Config.wallsWidth) {
                return !target.walls[0] && !target.walls[1] // top-right
            } else if (y % this.labyrinth.cellSize >= this.labyrinth.cellSize - Config.wallsWidth) {
                return !target.walls[1] && !target.walls[2] // bottom-right
            } else { return !target.walls[1] } // right
        } else {
            if (y % this.labyrinth.cellSize <= Config.wallsWidth) {
                return !target.walls[0] // top
            } else if (y % this.labyrinth.cellSize >= this.labyrinth.cellSize - Config.wallsWidth) {
                return !target.walls[2] // bottom
            } else { return true } // center
        }
    }

    randInt = (min: number, max: number): number => Math.floor(Math.random()*(max - min + 1)) + min
}