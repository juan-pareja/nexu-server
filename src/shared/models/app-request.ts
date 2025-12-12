import { Permission } from '@permissions/models/permission';

import { User } from '@users/models/user';

import { PureAbility } from '@casl/ability';
import { Request } from 'express';
import { DateTime } from 'luxon';

export class AppRequest extends Request {
  requester: User;
  permissions: Permission[];
  ability: PureAbility;
  time: DateTime;

  cookies: Record<string, string>;
}
