import SongService from "../Services/SongService.js";

//Private
let _songService = new SongService()

function _draw() {
  let elem = document.getElementById('songs')
  let mySongs = _songService.mySongs
  let apiSongs = _songService.apiSongs

  let template = '<ul>'
  mySongs.forEach(s => {
    template += s.Template
  })
  apiSongs.forEach(s => {
    template += s.Template
  })
  elem.innerHTML = template + '</ul>'
}

//Public
export default class SongController {
  constructor() {
    //NOTE Register all subscribers
    _songService.addSubscriber("songs", _draw)

    //NOTE Retrieve data
    _songService.getMusicByQuery('ccr')
  }

  search(e) {
    e.preventDefault();
    _songService.getMusicByQuery(e.target.query.value)
  }
}