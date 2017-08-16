import Config from './config'
import Labyrinth from './labyrinth'

export default class Canvas {

    labyrinth: Labyrinth
    canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('game')
    ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")
    orientation: string = 'landscape'

    constructor (labyrinth: Labyrinth) {
        this.labyrinth = labyrinth
    }

    draw = () => {
        this.drawBackground()
        this.drawLabyrinth()
    }

    resize = () => {
        this.canvas.width = window.innerWidth/2 - 4
        this.canvas.height = window.innerHeight/2 - 4
        this.orientation = this.canvas.width >= this.canvas.height ? 'landscape' : 'portrait'
        this.draw()
    }

    drawBackground = () => { this.rectangle(Config.backgroundColor) }

    drawLabyrinth = () => {
        this.labyrinth.grid.map((row, i) => {
            row.map((cell, j) => {
                if (cell.type == 'block') {
                    this.rectangle(
                        Config.blocksColor,
                        this.labyrinth.cellSize*j,
                        this.labyrinth.cellSize*i,
                        this.labyrinth.cellSize,
                        this.labyrinth.cellSize
                    )
                }
                cell.walls.map((wall, n) => {
                    if (wall) {
                        this.line(
                            Config.wallsColor,
                            this.labyrinth.cellSize*(j + (n == 1 ? 1 : 0)),
                            this.labyrinth.cellSize*(i + (n == 2 ? 1 : 0)),
                            this.labyrinth.cellSize*(j + (n != 3 ? 1 : 0)),
                            this.labyrinth.cellSize*(i + (n != 0 ? 1 : 0))
                        )
                    }
                })
            })
        })
    }

    rectangle = (color: string, x: number = 0, y: number = 0, w: number = this.canvas.width, h: number = this.canvas.height) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, w, h)
    }

    line = (color: string, xs: number = 0, ys: number = 0, xe: number = 0, ye: number = 0) => {
        this.ctx.strokeStyle = color
        this.ctx.beginPath()
        this.ctx.moveTo(xs, ys)
        this.ctx.lineTo(xe, ye)
        this.ctx.stroke()
    }
    
}