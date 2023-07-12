import AbstractView from '../framework/view/abstract-view.js';
import { createSortTemplate } from '../template/point-sort-template.js';
import { SortType } from '../const.js';

const enabledSortType = {
  [SortType.DAY]: true,
  [SortType.TIME]: true,
  [SortType.EVENT]: false,
  [SortType.PRICE]: true,
  [SortType.OFFER]: false
};

export default class SortView extends AbstractView {
  #sortMap = null;
  #onSortTypeChange = null;


  constructor({ sortType, onSortTypeChange }) {
    super();
    this.#sortMap = Object.values(SortType) // возвращает МАССИВ значений перечисляемых свойств
      .map((type) => ({
        type,
        isChecked: (type === sortType),
        isDisabled: !enabledSortType[type]
      })); /* [
        { type: 'day', isChecked: false, isDisabled: true },
        { type: 'time', isChecked: true, isDisabled: true },
        { type: 'event', isChecked: false, isDisabled: false },
        { type: 'price', isChecked: false, isDisabled: true },
        { type: 'offer', isChecked: false, isDisabled: false }
      ] */

    this.#onSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate({ sortMap: this.#sortMap });
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#onSortTypeChange(evt.target.dataset.sortType);
  };

}
