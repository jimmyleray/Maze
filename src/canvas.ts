import Config from './config'
import Labyrinth from './labyrinth'
import Player from './player'

export default class Canvas {

    labyrinth: Labyrinth
    canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('game')
    ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")
    players: Player[]


    constructor (labyrinth: Labyrinth, players: Player[] = []) {
        this.players = players
        this.labyrinth = labyrinth
        this.canvas.width = Math.floor(window.innerWidth/Config.cellSize)*Config.cellSize
        this.canvas.height = Math.floor(window.innerHeight/Config.cellSize)*Config.cellSize
        this.draw()
    }

    draw = () => {
        this.clear()
        this.drawLabyrinth()
        this.drawPlayers()
    }

    clear = () => { this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height) }

    drawLabyrinth = () => {
        this.labyrinth.grid.map((row, i) => {
            row.map((cell, j) => {
                if (cell.isEnd) {
                    this.rectangle(Config.endColor, this.labyrinth.cellSize*j, this.labyrinth.cellSize*i, this.labyrinth.cellSize, this.labyrinth.cellSize)
                }
                cell.walls.map((wall, n) => {
                    if (wall) {
                        this.line(
                            Config.wallsColor, Config.wallsWidth,
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

    drawPlayers = () => {
        this.players.map(player => {
            player.move()
            this.circle(Config.playersColors[player.id], 1, player.x, player.y, player.size)
            this.font(player.name, Config.playersColors[player.id], player.x + 2*player.size, player.y + player.size)
        })
    }

    font = (text: string, color: string, x: number = 0, y: number = 0, size: number = 12, font: string = 'Arial') => {
        this.ctx.font = size.toString() + 'px ' + font
        this.ctx.fillStyle = color
        this.ctx.fillText(text, x, y)
    }

    circle = (color: string, width: number = 1, x: number = 0, y: number = 0, r: number = 0) => {
        this.ctx.fillStyle = color
        this.ctx.lineWidth = width
        this.ctx.beginPath()
        this.ctx.arc(x, y, r, 0, 2*Math.PI)
        this.ctx.fill()
    }

    rectangle = (color: string, x: number = 0, y: number = 0, w: number = this.canvas.width, h: number = this.canvas.height) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, w, h)
    }

    line = (color: string, width: number = 1, xs: number = 0, ys: number = 0, xe: number = 0, ye: number = 0) => {
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = width
        this.ctx.beginPath()
        this.ctx.moveTo(xs, ys)
        this.ctx.lineTo(xe, ye)
        this.ctx.stroke()
    }
    
}