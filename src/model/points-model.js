import Observable from '../framework/observable.js';
export default class PointsModel extends Observable {

  #points = null;

  constructor(service) {
    super();
    this.#points = service.points;
  }

  get points() {
    return this.#points;
  }
}
