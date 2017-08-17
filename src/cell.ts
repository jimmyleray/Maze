import Config from './config'

export default class Cell {

    walls: boolean[] = [true, true, true, true] // top, right, bottom, left
    id: number

    constructor (id: number) {
        this.id = id
    }

}