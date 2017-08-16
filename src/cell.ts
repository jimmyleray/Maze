import Config from './config'

export default class Cell {

    walls: boolean[] = [true, true, true, true] // top, right, bottom, left
    type: string = 'void'

    constructor () {
        if (Math.random() < Config.blocksProbability) this.type = 'block'
    }

}