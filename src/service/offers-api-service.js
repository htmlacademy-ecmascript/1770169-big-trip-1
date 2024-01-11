import ApiService from '../framework/api-service.js';
import {Path} from '../const.js';

export default class OffersApiService extends ApiService {
  get offers() {
    return this._load({url: Path.OFFERS})
      .then(OffersApiService.parseResponse);
  }
}

