import ApiService from '../framework/api-service.js';
import {Path} from '../const.js';

export default class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({url: Path.DESTINATIONS})
      .then(DestinationsApiService.parseResponse);
  }
}
