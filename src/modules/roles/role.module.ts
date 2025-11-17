import { RoleController } from '@roles/role.controller';
import { RoleService } from '@roles/role.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
