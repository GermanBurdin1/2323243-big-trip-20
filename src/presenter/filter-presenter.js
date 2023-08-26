import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/fillters-view.js';
import { filter } from '../utils/filter.js';
import { UpdateType } from '../const.js';

export default class FilterPresenter {

  #pointsModel = null;
  #filterContainer = null;
  #filterModel = null;
  #filterComponent = null;


  constructor({ filterContainer, filterModel, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return Object.entries(filter)
      .map(([filterType, filterPoints]) => ({
        type: filterType,
        hasPoints: filterPoints(points).length > 0
      }));
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters: this.filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
