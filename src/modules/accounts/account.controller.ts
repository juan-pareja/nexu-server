import { AccountService } from '@accounts/account.service';

import { Controller } from '@nestjs/common';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
}
