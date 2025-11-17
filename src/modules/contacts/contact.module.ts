import { ContactController } from '@contacts/contact.controller';
import { ContactService } from '@contacts/contact.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
