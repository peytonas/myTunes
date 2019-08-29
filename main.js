import SongController from "./mytunes/Controllers/SongController.js";


class App {
  constructor() {
    this.controllers = {
      songController: new SongController()
    }
  }
}

window['app'] = new App()