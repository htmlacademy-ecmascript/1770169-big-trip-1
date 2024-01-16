import {render, replace, remove} from '../framework/render';
import EventCardView from '../view/event-card-view';
import EventEditView from '../view/event-edit-view';
import {getDestinationNames, isEscape} from '../utils/point';
import {ActionType, UpdateType} from '../const';

export default class EventCardPresenter {
  #point = null;
  #destinations = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventListContainer = null;
  #eventCardComponent = null;
  #eventEditComponent = null;
  #getDestination = null;
  #getOffers = null;
  #handleEventCardChange = null;
  #handleEventCardReset = null;
  #isEventOpen = false;

  constructor(
    {
      destinationsModel,
      offersModel,
      eventListContainer,
      getDestination,
      getOffers,
      onEventCardChange,
      onEventCardReset
    }
  ) {
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventListContainer = eventListContainer;
    this.#getDestination = getDestination;
    this.#getOffers = getOffers;
    this.#handleEventCardChange = onEventCardChange;
    this.#handleEventCardReset = onEventCardReset;
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
        getDestination: this.#getDestination,
        getOffers: this.#getOffers,
        onFormSubmit: this.#formSubmitHandler,
        onFormReset: this.#formResetHandler,
        onRollupButtonClick: this.#rollupButtonClickHandler,
      }
    );

    if (prevEventCardComponent === null || prevEventEditComponent === null) {
      render(this.#eventCardComponent, this.#eventListContainer.element);
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
    this.#handleEventCardReset();
  }

  #replaceEventEdit () {
    replace(this.#eventCardComponent, this.#eventEditComponent);
  }

  _removeComponent () {
    remove(this.#eventCardComponent);
    remove(this.#eventEditComponent);
  }

  _resetEventCard () {
    if (this.#eventStatus) {
      this.#hideEventEdit();
    }
  }

  #showEventEdit () {
    this.#replaceEventCard();
    document.addEventListener('keydown', this.#documentKeydownHandler);
    this.#eventStatus = true;
  }

  #hideEventEdit () {
    this.#eventEditComponent.reset();
    this.#replaceEventEdit();
    document.removeEventListener('keydown', this.#documentKeydownHandler);
    this.#eventStatus = false;
  }

  setSaving() {
    if (this.#eventStatus) {
      this.#eventEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#eventStatus) {
      this.#eventEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (!this.#eventStatus) {
      this.#eventCardComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#eventEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventEditComponent.shake(resetFormState);
  }

  #documentKeydownHandler = (evt) => {
    if (isEscape(evt)) {
      this.#hideEventEdit();
    }
  };

  #formSubmitHandler = (point) => {
    this.#handleEventCardChange(
      ActionType.UPDATE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #formResetHandler = () => {
    this.#handleEventCardChange(
      ActionType.DELETE_POINT,
      UpdateType.MINOR,
      this.#point
    );
  };

  #rollupButtonClickHandler = () => {
    if (this.#eventStatus) {
      return this.#hideEventEdit();
    }
    return this.#showEventEdit();
  };

  #favoriteButtonClickHandler = () => {
    this.#handleEventCardChange(
      ActionType.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };
}
