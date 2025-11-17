import { UserController } from '@users/user.controller';
import { UserService } from '@users/user.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
