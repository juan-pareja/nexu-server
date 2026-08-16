import { ContactsCreateRequest } from '@contacts/models/contact-create-request';

import { OmitType, PartialType } from '@nestjs/mapped-types';

export class ContactsUpdateRequest extends PartialType(OmitType(ContactsCreateRequest, [])) {}
