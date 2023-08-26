function createFilterItem({ type, hasPoints }, currentFilterType) {
  return (/* html */`
    <div class="trip-filters__filter" >
        <input
          id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          ${type === currentFilterType ? 'checked' : ''}
          ${(hasPoints) ? '' : 'disabled'}>
        <label
          class="trip-filters__filter-label"
          for="filter-${type}">
          ${type}
          </label>
    </div>`
  );
}

function createFilterTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItem(filter, currentFilterType))
    .join('');
  return (/* html */`
  <form class="trip-filters" action = "#" method = "get">
    ${filterItemsTemplate}
    <button  class="visually-hidden"  type="submit">Accept filter</button>
     </form >
  `);
}

export { createFilterTemplate };
