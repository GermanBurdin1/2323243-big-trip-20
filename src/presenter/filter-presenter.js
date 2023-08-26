import { render } from '../framework/render.js';
import FilterView from '../view/fillters-view.js';

const filters = [
  {
    type: 'everything',
    hasPoints: true,
  },
  {
    type: 'future',
    hasPoints: true,
  },
  {
    type: 'present',
    hasPoints: false,
  },
  {
    type: 'past',
    hasPoints: true,
  },
];
export default class FilterPresenter {

  #pointsModel = null;
  #filterContainer = null;


  constructor({ filterContainer, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;

  }

  init() {
    render(new FilterView({
      filters,
      currentFilterType: 'everything',
      onFilterTypeChange: () => { }
    }), this.#filterContainer);
  }
}
