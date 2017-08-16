import Config from './config'

export default class Canvas {

    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    orientation: string = 'landscape'

    constructor () {
        this.canvas = <HTMLCanvasElement> document.getElementById('game')
        this.ctx = this.canvas.getContext("2d")
        window.addEventListener('resize', this.resize)
        this.resize()
        this.render()
    }

    render = () => {
        this.background()
        requestAnimationFrame(this.render)
    }

    resize = () => {
        this.canvas.width = window.innerWidth/2 - 4
        this.canvas.height = window.innerHeight/2 - 4
        this.orientation = this.canvas.width >= this.canvas.height ? 'landscape' : 'portrait'
    }

    background = () => { this.rectangle(Config.backgroundColor) }

    rectangle = (color: string, x: number = 0, y: number = 0, w: number = this.canvas.width, h: number = this.canvas.height) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, w, h)
    }
    
}