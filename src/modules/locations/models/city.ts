import { Country } from '@locations/models/country';
import { State } from '@locations/models/state';

export class City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  wikidataId: string | null;
  countryAlpha2Code: string;
  countryId: number;
  country: Country;
  stateCode: string;
  stateId: number;
  state: State;
}
