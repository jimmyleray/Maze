import Config from './config'
import Canvas from './canvas'
import Chrono from './chrono'
import Player from './player'
import Labyrinth from './labyrinth'

export default class Game {
    
    labyrinth: Labyrinth = new Labyrinth()
    canvas: Canvas = new Canvas()
    chrono: Chrono = new Chrono()
    players: Player[] = []

    constructor () {

    }

}