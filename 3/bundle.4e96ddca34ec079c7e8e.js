(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}class n{getTemplate(){return'<li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="2019-03-18">MAR 18</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">Taxi Amsterdam</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>\n          &mdash;\n          <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>\n        </p>\n        <p class="event__duration">30M</p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">20</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        <li class="event__offer">\n          <span class="event__offer-title">Order Uber</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">20</span>\n        </li>\n      </ul>\n      <button class="event__favorite-btn event__favorite-btn--active" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>\n  </li>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const i=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];class s{getTemplate(){return`<li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n    <div class="event__type-wrapper">\n      <label class="event__type  event__type-btn" for="event-type-toggle-1">\n        <span class="visually-hidden">Choose event type</span>\n        <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">\n      </label>\n      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n      <div class="event__type-list">\n        <fieldset class="event__type-group">\n          <legend class="visually-hidden">Event type</legend>\n          ${i.map((e=>{return`<div class="event__type-item">\n    <input id="event-type-${t=e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}">\n    <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${(e=>{const t=e.toLowerCase();return t[0].toUpperCase()+t.slice(1)})(t)}</label>\n  </div>`;var t})).join("")}\n        </fieldset>\n      </div>\n    </div>\n\n    <div class="event__field-group  event__field-group--destination">\n      <label class="event__label  event__type-output" for="event-destination-1">\n        Flight\n      </label>\n      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">\n      <datalist id="destination-list-1">\n        <option value="Amsterdam"></option>\n        <option value="Geneva"></option>\n        <option value="Chamonix"></option>\n      </datalist>\n    </div>\n\n    <div class="event__field-group  event__field-group--time">\n      <label class="visually-hidden" for="event-start-time-1">From</label>\n      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">\n      &mdash;\n      <label class="visually-hidden" for="event-end-time-1">To</label>\n      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">\n    </div>\n\n    <div class="event__field-group  event__field-group--price">\n      <label class="event__label" for="event-price-1">\n        <span class="visually-hidden">Price</span>\n        &euro;\n      </label>\n      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">\n    </div>\n\n    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n    <button class="event__reset-btn" type="reset">Delete</button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>\n  </header>\n      <section class="event__details">\n    <section class="event__section  event__section--offers">\n    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n    <div class="event__available-offers">\n      <div class="event__offer-selector">\n    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>\n    <label class="event__offer-label" for="event-offer-luggage-1">\n      <span class="event__offer-title">Add luggage</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">50</span>\n    </label>\n  </div>\n    </div>\n  </section>\n    <section class="event__section  event__section--destination">\n    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n    <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>\n\n    <div class="event__photos-container">\n      <div class="event__photos-tape">\n        <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">\n      </div>\n    </div>\n  </section>\n  </section>\n    </form>\n  </li>`}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class l{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const a=["everything","future","present","past"];class r{getTemplate(){return`<form class="trip-filters" action="#" method="get">\n    ${a.map((e=>{return`<div class="trip-filters__filter">\n    <input id="filter-${t=e}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${t}" checked>\n    <label class="trip-filters__filter-label" for="filter-${t}">${t}</label>\n  </div>`;var t})).join("")}\n    <button class="visually-hidden" type="submit">Accept filter</button>\n  </form>`}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class o{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>\n    </div>\n\n    <p class="trip-info__cost">\n      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n    </p>\n  </section>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const v=["day","event","time","price","offer"];class p{getTemplate(){return`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    ${v.map((e=>{return`<div class="trip-sort__item  trip-sort__item--${t=e}">\n    <input id="sort-${t}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${t}" checked>\n    <label class="trip-sort__btn" for="sort-${t}">${t}</label>\n  </div>`;var t})).join("")}\n  </form>`}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const c=document.querySelector(".trip-main"),_=c.querySelector(".trip-controls__filters"),d=document.querySelector(".trip-events");new class{eventListComponent=new l;constructor({tripMainContainer:e,filterContainer:t,eventsContainer:n}){this.tripMainContainer=e,this.filterContainer=t,this.eventsContainer=n}init(){t(new o,this.tripMainContainer,"afterbegin"),t(new r,this.filterContainer),t(new p,this.eventsContainer),t(this.eventListComponent,this.eventsContainer),t(new s,this.eventListComponent.getElement());for(let e=0;e<3;e++)t(new n,this.eventListComponent.getElement())}}({tripMainContainer:c,filterContainer:_,eventsContainer:d}).init()})();
//# sourceMappingURL=bundle.4e96ddca34ec079c7e8e.js.map