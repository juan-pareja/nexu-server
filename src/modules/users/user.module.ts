import { UserController } from '@users/user.controller';
import { UserService } from '@users/user.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
