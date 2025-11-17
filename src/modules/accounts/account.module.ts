import { AccountController } from '@accounts/account.controller';
import { AccountService } from '@accounts/account.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
