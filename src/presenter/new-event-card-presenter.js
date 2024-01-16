import EventEditView from '../view/event-edit-view';
import {RenderPosition, render, remove} from '../framework/render';
import {getDestinationNames, isEscape} from '../utils/point';
import {ActionType, DEFAULT_POINT, UpdateType} from '../const';

export default class NewEventCardPresenter {
  #destinationsModel = null;
  #offersModel = null;
  #destinations = null;
  #eventEditComponent = null;
  #eventListContainer = null;
  #getDestination = null;
  #getOffers = null;
  #handleEventCardChange = null;
  #handleClose = null;

  constructor(
    {
      destinationsModel,
      offersModel,
      eventListContainer,
      getDestination,
      getOffers,
      onEventCardChange,
      onCloseClick
    }
  ) {
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventListContainer = eventListContainer;
    this.#getDestination = getDestination;
    this.#getOffers = getOffers;
    this.#handleEventCardChange = onEventCardChange;
    this.#handleClose = onCloseClick;
  }

  init() {
    this.#destinations = this.#destinationsModel.destinations;

    if (this.#eventEditComponent !== null) {
      return;
    }
    this.#eventEditComponent = new EventEditView(
      {
        availableCities: getDestinationNames(this.#destinations),
        offers: this.#offersModel._getOffersByType(DEFAULT_POINT.type),
        getDestination: this.#getDestination,
        getOffers: this.#getOffers,
        onFormSubmit: this.#formSubmitHandler,
        onFormReset: this.#formResetHandler,
      }
    );
    render(this.#eventEditComponent, this.#eventListContainer.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  close() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleClose();
    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#eventEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#eventEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventEditComponent.shake(resetFormState);
  }

  #formSubmitHandler = (point) => {
    this.#handleEventCardChange(
      ActionType.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #formResetHandler = () => {
    this.close();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      this.close();
    }
  };
}
