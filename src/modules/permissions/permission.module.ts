import { PermissionController } from '@permissions/permission.controller';
import { PermissionService } from '@permissions/permission.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
