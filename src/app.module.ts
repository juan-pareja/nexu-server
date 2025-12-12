import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { PrismaModule } from '@src/prisma/prisma.module';

import { SecurityModule } from '@security/security.module';

import { AccountModule } from '@accounts/account.module';

import { ContactModule } from '@contacts/contact.module';

import { CurrencyModule } from '@currencies/currency.module';

import { FacilityModule } from '@facilities/facility.module';

import { LocationModule } from '@locations/location.module';

import { OpportunityModule } from '@opportunities/opportunity.module';

import { PermissionModule } from '@permissions/permission.module';

import { RoleModule } from '@roles/role.module';

import { TenantModule } from '@tenants/tenant.module';

import { UserModule } from '@users/user.module';

import { QuoteModule } from '@quotes/quote.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AccountModule,
    ContactModule,
    CurrencyModule,
    FacilityModule,
    LocationModule,
    OpportunityModule,
    PermissionModule,
    PrismaModule,
    QuoteModule,
    RoleModule,
    SecurityModule,
    TenantModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
