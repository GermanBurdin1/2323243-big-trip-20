import EventListView from '../view/event-list-view.js';
import { remove, render, RenderPosition, replace } from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../const.js';
import { sort } from '../utils/sort.js';

export default class BoardPresenter {

  #listComponent = new EventListView();
  #boardContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #sortComponent = null;
  #noTaskComponent = new NoPointView();
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;


  constructor({ boardContainer, destinationsModel, offersModel, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return sort[this.#currentSortType]([...this.#pointsModel.points]);
  }

  init() {
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderSort(container) {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#sortTypeChangeHandler
    });
    if (prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, container, RenderPosition.AFTERBEGIN);
    }
  }


  #renderNoPoints() {
    render(this.#noTaskComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoints() {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderBoard() {
    render(this.#listComponent, this.#boardContainer);

    if (this.points.every((point) => point === null)) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort(this.#boardContainer);
    this.#renderPoints();
  }

  #sortTypeChangeHandler = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderSort(this.#boardContainer);
    this.#renderPoints();
  };
}
