import ApiService from '../framework/api-service';
import {Path} from '../const';

export default class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({url: Path.DESTINATIONS})
      .then(DestinationsApiService.parseResponse);
  }
}
