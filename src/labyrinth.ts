import Config from './config'
import Cell from './cell'

export default class Labyrinth {
    
    width: number
    height: number
    cellSize: number
    grid: Cell[][] = []

    constructor (width: number = 50, height: number = 20, cellSize: number = 30) {
        this.width = width
        this.height = height
        this.cellSize = cellSize
        
        this.createGrid()
        while (!this.isGenerated()) this.generateLabyrinth()
        this.selectEnd()

    }

    createGrid = () => {
        for (let i = 0; i < this.height; i++) {
            this.grid.push([])
            for (let j = 0; j < this.width; j++) {
                this.grid[i].push(new Cell(j + i*this.width))
            }
        }
    }

    generateLabyrinth = () => {
        let i = this.randInt(0, this.height - 1), j = this.randInt(0, this.width - 1), k = this.randInt(0, 3)
        if (!((i == 0 && k == 0) || (j == 0 && k == 3) || (i == this.height - 1 && k == 2) || (j == this.width - 1 && k == 1))) {
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

    selectEnd = () => { this.grid[this.randInt(0, this.height - 1)][this.randInt(0, this.width - 1)].isEnd = true }

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