import Canvas from "./canvas"

export default class Game {

    canvas = new Canvas()

    init = () => {
        window.addEventListener('resize', this.canvas.resize)
        this.canvas.resize()
        this.render()
    }

    render = () => {
        this.canvas.background()
        requestAnimationFrame(this.render)
    }

}