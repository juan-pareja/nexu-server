import { Permission } from '@permissions/models/permission';

import { User } from '@users/models/user';

export class AppResponse<T = any> {
  success: boolean;
  data?: T;
  total?: number;
  requester?: User;
  permissions?: Permission[];
}
