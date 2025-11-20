import { Permission } from '@permissions/models/permission';

import { User } from '@users/models/user';

import { PureAbility } from '@casl/ability';
import { Request } from 'express';

export class AppRequest extends Request {
  requester: User;
  permissions: Permission[];
  ability: PureAbility;

  cookies: Record<string, string>;
}
