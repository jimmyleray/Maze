import Config from './config'
import Cell from './cell'

export default class Labyrinth {
    
    width: number
    height: number
    cellSize: number
    grid: Cell[][] = []

    constructor (width: number = 35, height: number = 20, cellSize: number = 20) {
        this.width = width
        this.height = height
        this.cellSize = cellSize
        
        for (let i = 0; i < this.height; i++) {
            this.grid.push([])
            for (let j = 0; j < this.width; j++) {
                this.grid[i].push(new Cell())
            }
        }
    }

}