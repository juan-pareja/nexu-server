import { Prisma } from '@generated/prisma/client';

import { Account } from '@accounts/models/account';

import { Contact } from '@contacts/models/contact';

import { City } from '@locations/models/city';
import { Region } from '@locations/models/region';
import { State } from '@locations/models/state';
import { Subregion } from '@locations/models/subregion';

import { User } from '@users/models/user';

export class Country {
  id: number;
  name: string;
  nativeName: string | null;
  nameTranslations: Prisma.JsonValue | null;
  nationality: string | null;
  alpha3Code: string;
  alpha2Code: string;
  numericCode: string | null;
  phoneCode: string | null;
  currencyCode: string | null;
  topLevelDomain: string | null;
  emoji: string | null;
  emojiUnicode: string | null;
  timezones: Prisma.JsonValue | null;
  capitalName: string | null;
  subregionName: string | null;
  regionName: string | null;
  latitude: number | null;
  longitude: number | null;
  wikidataId: string | null;
  regionId: number | null;
  region?: Region | null;
  subregionId: number | null;
  subregion?: Subregion | null;
  states?: State[];
  cities?: City[];
  phoneUsers?: User[];
  phoneContacts?: Contact[];
  acccounts?: Account[];
}
