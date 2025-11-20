import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';

import { SecurityModule } from '@security/security.module';

import { AccountModule } from '@accounts/account.module';

import { ContactModule } from '@contacts/contact.module';

import { FacilityModule } from '@facilities/facility.module';

import { OpportunityModule } from '@opportunities/opportunity.module';

import { PermissionModule } from '@permissions/permission.module';

import { RoleModule } from '@roles/role.module';

import { TenantModule } from '@tenants/tenant.module';

import { UserModule } from '@users/user.module';

import { QuoteModule } from '@quotes/quote.module';

import { Module } from '@nestjs/common';

@Module({
  imports: [AccountModule, ContactModule, FacilityModule, OpportunityModule, PermissionModule, QuoteModule, RoleModule, SecurityModule, TenantModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
