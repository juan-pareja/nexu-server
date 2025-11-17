import { ContactService } from '@contacts/contact.service';

import { Controller } from '@nestjs/common';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
}
