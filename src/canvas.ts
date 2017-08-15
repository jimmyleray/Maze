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
        const borderWidth: number = 2*parseInt(getComputedStyle(this.canvas).getPropertyValue('border-width').slice(0, -2))
        this.canvas.width = window.innerWidth/2 - borderWidth
        this.canvas.height = window.innerHeight/2 - borderWidth
        this.orientation = this.canvas.width >= this.canvas.height ? 'landscape' : 'portrait'
    }

    background = () => { this.rectangle(Config.backgroundColor) }

    rectangle = (color: string, x: number = 0, y: number = 0, w: number = this.canvas.width, h: number = this.canvas.height) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, w, h)
    }
    
}