import Config from './config'

export default class Canvas {

    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    orientation: string = 'landscape'

    constructor (id: string) {
        this.canvas = <HTMLCanvasElement> document.getElementById(id)
        this.ctx = this.canvas.getContext("2d")
        window.addEventListener('resize', this.resize)
        this.resize()
    }

    resize = () => {
        this.canvas.width = window.innerWidth/2 - 4
        this.canvas.height = window.innerHeight/2 - 4
        this.orientation = this.canvas.width >= this.canvas.height ? 'landscape' : 'portrait'
    }

    background = (id: number) => { this.rectangle('white'); this.rectangle(Config.playersColors[id].slice(0, 20) + '0.1)') }

    rectangle = (color: string, x: number = 0, y: number = 0, w: number = this.canvas.width, h: number = this.canvas.height) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, w, h)
    }
    
}