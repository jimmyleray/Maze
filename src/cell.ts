import Config from './config'

export default class Cell {

    walls: boolean[] = [true, true, true, true] // top, right, bottom, left
    type: string = 'void'
    id: string = (new Date().getTime() + Math.floor(1 + Math.random()*10000)).toString(16)

    constructor () {
        if (Math.random() < Config.blocksProbability) this.type = 'block'
    }

}