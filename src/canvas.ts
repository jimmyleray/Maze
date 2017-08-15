import Config from "./config"

export default class Canvas {

    orientation: string = "landscape"
    canvas = <HTMLCanvasElement> document.getElementById('game')
    ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")

    resize = () => {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.orientation = this.canvas.width >= this.canvas.height ? "landscape" : "portrait"
    }

    background = () => { this.rectangle(Config.backgroundColor) }

    rectangle = (color: string, x: number = 0, y: number = 0, w: number = this.canvas.width, h: number = this.canvas.height) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, w, h)
    }
    
}