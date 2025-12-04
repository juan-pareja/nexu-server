import { Prisma } from '@generated/prisma/client';

import { Country } from '@locations/models/country';
import { Region } from '@locations/models/region';

export class Subregion {
  id: number;
  name: string;
  nameTranslations: Prisma.JsonValue | null;
  wikidataId: string | null;
  regionId: number;
  region?: Region;
  countries?: Country[];
}
