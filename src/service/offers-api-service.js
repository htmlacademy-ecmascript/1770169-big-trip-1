import ApiService from '../framework/api-service';
import {Path} from '../const';

export default class OffersApiService extends ApiService {
  get offers() {
    return this._load({url: Path.OFFERS})
      .then(OffersApiService.parseResponse);
  }
}
