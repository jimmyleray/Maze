import Config from './config'

export default class Cell {

    walls: boolean[] = [true, true, true, true] // top, right, bottom, left
    id: number
    isEnd: boolean = false

    constructor (id: number) {
        this.id = id
    }

    countWalls = () => this.walls.filter(v => v).length

}