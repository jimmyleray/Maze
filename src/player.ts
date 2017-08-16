import Config from './config'
import Canvas from './canvas'

export default class Player {

    id: number
    name: string

    constructor (id: number, name: string = undefined) {
        this.id = id
        this.name = name ? name : 'Player ' + (id + 1).toString()
    }
    
}