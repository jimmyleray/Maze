import Config from './config'

export default class Cell {

    id: number
    isEnd: boolean = false
    walls: boolean[] = [true, true, true, true]
    // Walls order :   top, right, bottom, left

    constructor (id: number) {
        this.id = id
    }

    countWalls = () => this.walls.filter(v => v).length

}