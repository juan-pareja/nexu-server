import { PermissionService } from '@permissions/permission.service';

import { Controller } from '@nestjs/common';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
}
