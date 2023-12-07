import {render, replace, remove} from '../framework/render';
import EventCardView from '../view/event-card-view';
import EventEditView from '../view/event-edit-view';
import {getDestinationNames, isEscape} from '../utils';

export default class EventCardPresenter {
  #point = null;
  #destinations = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventListComponent = null;
  #eventCardComponent = null;
  #eventEditComponent = null;
  #eventCardChangeHandler = null;
  #eventCardResetHandler = null;
  #isEventOpen = false;

  constructor(
    {
      destinationsModel,
      offersModel,
      eventListComponent,
      onEventCardChange,
      onEventCardReset
    }
  ) {
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventListComponent = eventListComponent;
    this.#eventCardChangeHandler = onEventCardChange;
    this.#eventCardResetHandler = onEventCardReset;
  }

  init(point) {
    this.#point = point;
    this.#destinations = this.#destinationsModel.destinations;
    const prevEventCardComponent = this.#eventCardComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventCardComponent = new EventCardView(
      {
        point: this.#point,
        destination: this.#destinationsModel._getDestinationsById(this.#point.destination),
        offers: this.#offersModel._getOfferItemsById(this.#point.type, this.#point.offers),
        onRollupButtonClick: this.#rollupButtonClickHandler,
        onFavoriteButtonClick: this.#favoriteButtonClickHandler
      }
    );

    this.#eventEditComponent = new EventEditView(
      {
        point: this.#point,
        destination: this.#destinationsModel._getDestinationsById(this.#point.destination),
        availableCities: getDestinationNames(this.#destinations),
        offers: this.#offersModel._getOffersByType(this.#point.type),
        checkedOffers: this.#point.offers,
        onFormSubmit: this.#formSubmitHandler,
        onRollupButtonClick: this.#rollupButtonClickHandler,
        getDestination: this.#getDestination,
        getOffers: this.#getOffers
      }
    );

    if (prevEventCardComponent === null || prevEventEditComponent === null) {
      render(this.#eventCardComponent, this.#eventListComponent.element);
      return;
    }

    if (!this.#eventStatus) {
      replace(this.#eventCardComponent, prevEventCardComponent);
    }

    if (this.#eventStatus) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventCardComponent);
    remove(prevEventEditComponent);
  }

  get #eventStatus() {
    return this.#isEventOpen;
  }

  set #eventStatus(value) {
    this.#isEventOpen = value;
  }

  #replaceEventCard () {
    replace(this.#eventEditComponent, this.#eventCardComponent);
    this.#eventCardResetHandler();
    this.#eventStatus = true;
  }

  #replaceEventEdit () {
    replace(this.#eventCardComponent, this.#eventEditComponent);
    this.#eventStatus = false;
  }

  _removeComponent () {
    remove(this.#eventCardComponent);
    remove(this.#eventEditComponent);
  }

  _resetEventCard () {
    if (this.#eventStatus) {
      this.#replaceEventEdit();
      this.#eventEditComponent.reset(
        this.#point,
        this.#destinationsModel._getDestinationsById(this.#point.destination),
        this.#offersModel._getOffersByType(this.#point.type),
        getDestinationNames(this.#destinations)
      );
    }
  }

  #documentKeydownHandler = (evt) => {
    if (isEscape(evt)) {
      this.#hideEventEdit();
    }
  };

  #showEventEdit () {
    this.#replaceEventCard();
    document.addEventListener('keydown', this.#documentKeydownHandler);
  }

  #hideEventEdit () {
    this.#replaceEventEdit();
    document.removeEventListener('keydown', this.#documentKeydownHandler);
  }

  #getDestination = (name) => this.#destinationsModel._getDestinationsByName(name);

  #getOffers = (type) => this.#offersModel._getOffersByType(type);

  #formSubmitHandler = (point) => {
    this.#hideEventEdit();
    this.#eventCardChangeHandler(point);
  };

  #rollupButtonClickHandler = () => {
    if (this.#eventStatus) {
      return this.#hideEventEdit();
    }
    return this.#showEventEdit();
  };

  #favoriteButtonClickHandler = () => {
    this.#eventCardChangeHandler({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
