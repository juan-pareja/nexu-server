import { AccountCreateRequest } from '@accounts/models/account-create-request';

import { OmitType, PartialType } from '@nestjs/mapped-types';

export class AccountUpdateRequest extends PartialType(OmitType(AccountCreateRequest, [])) {}
