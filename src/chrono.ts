import Config from './config'

export default class Chrono {

    startTime: Date
    actualTime: Date
    diffTime: number = 0
    stockedTime: number = 0
    isPaused: boolean = false
    chrono: HTMLElement = document.getElementById('chrono')

    constructor () {
        this.chrono.addEventListener('click', event => {
            if (!this.isPaused) { this.isPaused = true } else { this.start() }
        })
    }

    start = () => {
        this.isPaused = false
        this.startTime = new Date()
        this.actualize()
    }

    actualize = () => {
        this.actualTime = new Date()
        this.diffTime = this.stockedTime + Math.abs(this.actualTime.getTime() - this.startTime.getTime())
        this.display()
        if (!this.isPaused) { requestAnimationFrame(this.actualize) } else { this.stockedTime = this.diffTime }
    }

    display = () => {
        this.chrono.childNodes[1].textContent = ((this.diffTime - this.diffTime % 1000) / 1000).toString()
        this.chrono.childNodes[3].textContent = ('00' + (this.diffTime % 1000).toString()).slice(-3, -1)
    }
    
}