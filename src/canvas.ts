import Config from './config'
import Labyrinth from './labyrinth'
import Player from './player'

export default class Canvas {

    id: string
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D


    constructor (id: string) {
        this.id = id

        // Create canvas element with specific id
        const div: HTMLElement = document.createElement('canvas')
        div.setAttribute('id', this.id)
        document.getElementById('game').appendChild(div)
        this.canvas = <HTMLCanvasElement> document.getElementById(id)

        // Create context of the canvas
        this.ctx = this.canvas.getContext("2d")

        // Manages the dimension of the canvas according to the window 
        this.canvas.width = Math.floor(window.innerWidth/Config.cellSize)*Config.cellSize
        this.canvas.height = Math.floor((window.innerHeight-64)/Config.cellSize)*Config.cellSize
    }

    clear = () => { this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height) }

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