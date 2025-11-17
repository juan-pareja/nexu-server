import { QuoteController } from '@quotes/quote.controller';
import { QuoteService } from '@quotes/quote.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
