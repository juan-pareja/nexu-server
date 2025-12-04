import { Prisma } from '@generated/prisma/client';
import { CurrencyType } from '@generated/prisma/enums';

import { Opportunity } from '@opportunities/models/opportunity';

export class Currency {
  id: number;
  code: string;
  name: string;
  namePlural: string;
  iconName: string | null;
  symbol: string;
  nativeSymbol: string;
  decimals: number;
  rounding: number;
  type: CurrencyType;
  countryAlpha2Codes: Prisma.JsonValue;
  amountOpportunities?: Opportunity[];
}
