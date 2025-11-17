import { QuoteService } from '@quotes/quote.service';

import { Controller } from '@nestjs/common';

@Controller('quotes')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}
}
