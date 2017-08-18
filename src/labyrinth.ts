import Config from './config'
import Cell from './cell'

export default class Labyrinth {
    
    width: number
    height: number
    cellSize: number
    grid: Cell[][] = []

    constructor (width: number = 65, height: number = 35, cellSize: number = 15) {
        this.width = width
        this.height = height
        this.cellSize = cellSize
        
        for (let i = 0; i < this.height; i++) {
            this.grid.push([])
            for (let j = 0; j < this.width; j++) {
                this.grid[i].push(new Cell(j + i*this.width))
            }
        }

        while (!this.isGenerated()) {
            let i = this.randInt(0, this.height - 1), j = this.randInt(0, this.width - 1), k = this.randInt(0, 3)
            if (this.grid[i][j].walls[k]) {
                let target: Cell
                switch (k) {
                    case 0: target = this.grid[i == 0 ? this.height - 1 : i - 1][j]; break
                    case 1: target = this.grid[i][j == this.width - 1 ? 0 : j + 1]; break
                    case 2: target = this.grid[i == this.height - 1 ? 0 : i + 1][j]; break
                    case 3: target = this.grid[i][j == 0 ? this.width - 1 : j - 1]; break
                }
                if (this.grid[i][j].id != target.id) {
                    this.grid[i][j].walls[k] = false
                    target.walls[(k + 2) % 4] = false
                    this.updateGroupId(this.grid[i][j].id, target.id)
                }
            }
        }

    }

    updateGroupId = (id: number, targetId: number) => {
        this.grid.map((row, i) => {
            row.map((cell, j) => {
                if (cell.id == targetId) cell.id = id
            })
        })
    }

    isGenerated = (): boolean => {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.grid[i][j].id != this.grid[0][0].id) return false
            }
        }
        return true
    }

    randInt = (min: number, max: number): number => Math.floor(Math.random()*(max - min + 1)) + min

}