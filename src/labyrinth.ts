import Config from './config'
import Case from './case'

export default class Labyrinth {
    
    size: number
    grid: Case[][] = []

    constructor (size: number = 9) {
        this.size = size
        this.init()
    }

    init = () => {
        for (let i = 0; i < this.size; i++) {
            this.grid.push([])
            for (let j = 0; j < this.size; j++) {
                this.grid[i].push(new Case())
            }
        }
        console.log(this.grid)
    }
}