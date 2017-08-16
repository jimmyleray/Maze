import Config from './config'

export default class Chrono {

    startTime: Date
    diffTime: number = 0
    stockedTime: number = 0
    isPaused: boolean = true
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
        this.diffTime = this.stockedTime + Math.abs(new Date().getTime() - this.startTime.getTime())
        if (!this.isPaused) { requestAnimationFrame(this.actualize) } else { this.stockedTime = this.diffTime }
        this.display()
    }

    display = () => {
        this.chrono.childNodes[1].textContent = ''
        this.chrono.childNodes[3].textContent = ((this.diffTime - this.diffTime % 1000) / 1000).toString()
        this.chrono.childNodes[5].textContent = ('00' + (this.diffTime % 1000).toString() + '0').slice(-4, -1)
    }
    
}