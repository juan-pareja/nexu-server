import { RoleService } from '@roles/role.service';

import { Controller } from '@nestjs/common';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
}
