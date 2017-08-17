import Config from './config'
import Cell from './cell'

export default class Labyrinth {
    
    width: number
    height: number
    cellSize: number
    grid: Cell[][] = []

    constructor (width: number = 50, height: number = 30, cellSize: number = 20) {
        this.width = width
        this.height = height
        this.cellSize = cellSize
        
        for (let i = 0; i < this.height; i++) {
            this.grid.push([])
            for (let j = 0; j < this.width; j++) {
                this.grid[i].push(new Cell())
            }
        }

        let m = 0
        while (m<3000) {
            let i = this.randInt(0, this.height - 1), j = this.randInt(0, this.width - 1), k = this.randInt(0, 4)
            this.grid[i][j].walls[k] = false
            let target: Cell
            switch (k) {
                case 0:
                    target = this.grid[i - 1 < 0 ? this.height - 1 : i - 1][j] 
                    target.walls[2] = false
                    break
                case 1:
                    target = this.grid[i][j + 1 == this.width ? 0 : j + 1] 
                    target.walls[3] = false
                    break
                case 2:
                    target = this.grid[i + 1 == this.height ? 0 : i + 1][j] 
                    target.walls[0] = false
                    break
                case 3:
                    target = this.grid[i][j - 1 < 0 ? this.width - 1 : j - 1] 
                    target.walls[1] = false
                    break
            }
            m++
        }

    }

    updateGroup = () => {

    }

    isGenerated = (): boolean => {
        let i = 0, j = 0
        while (this.grid[0][0].id == this.grid[i][j].id) {
            if (j + 1 == this.width) { i++; j = 0 } else { j++ }
            if ( i == this.height && j == this.width) { return true }
        }
        return false
    }

    randInt = (min: number, max: number): number => Math.floor(Math.random()*(max - min + 1)) + min

}