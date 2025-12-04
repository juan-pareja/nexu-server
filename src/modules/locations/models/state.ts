import { City } from '@locations/models/city';
import { Country } from '@locations/models/country';

export class State {
  id: number;
  name: string;
  type: string | null;
  code: string | null;
  fipsCode: string | null;
  latitude: number;
  longitude: number;
  wikidataId: string | null;
  level: number | null;
  parentId: number | null;
  native_name: string | null;
  countryAlpha2Code: string;
  countryId: number;
  country?: Country;
  cities?: City[];
}
