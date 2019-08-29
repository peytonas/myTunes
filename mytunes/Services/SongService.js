import Song from "../Models/Song.js";

// @ts-ignore
let _sandBoxApi = axios.create({
  baseURL: 'http://bcw-sandbox.herokuapp.com/api/peyton/songs'
})

// @ts-ignore
let _apiSongs = axios.create({
  baseURL: "https://itunes.apple.com/search?callback=?&term="
})

//Private
let _state = {
  apiSongs: [],
  mySongs: []
}

//NOTE methods to run when a given property in state changes
let _subscribers = {
  apiSongs: [],
  mySongs: []
}

function _setState(propName, data) {
  //NOTE add the data to the state
  _state[propName] = data
  //NOTE run every subscriber function that is watching that data
  _subscribers[propName].forEach(fn => fn());
}

//Public
export default class SongService {
  get apiSongs() {
    return _state.apiSongs
  }
  get mySongs() {
    return _state.mySongs
  }

  getApiSongs() {
    _sandBoxApi.get()
      .then(res => {
        _setState("apiSongs", res.data)
      })
  }
  getMySongs() {
    _sandBoxApi.get()
      .then(res => {
        _setState("mySongs", res.data)
      })
  }

  //NOTE adds the subscriber function to the array based on the property it is watching
  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }

  getMusicByQuery(query) {
    var url = 'https://itunes.apple.com/search?callback=?&term=' + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        let results = res.results.map(rawData => new Song(rawData))
        _setState('songs', results)
      })
      .catch(err => console.log(err))
  }
}
