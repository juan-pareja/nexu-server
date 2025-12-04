import { Prisma } from '@generated/prisma/client';

import { Country } from '@locations/models/country';
import { Subregion } from '@locations/models/subregion';

export class Region {
  id: number;
  name: string;
  nameTranslations: Prisma.JsonValue | null;
  wikidataId: string | null;
  countries?: Country[];
  subregions?: Subregion[];
}
