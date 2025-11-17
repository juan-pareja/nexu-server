import { UserService } from '@users/user.service';

import { Controller } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
