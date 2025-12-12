import { SecurityController } from '@security/security.controller';
import { SecurityGuard } from '@security/security.guard';
import { AuthenticationService } from '@security/services/authentication.service';
import { AuthorizationService } from '@security/services/authorization.service';

import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  controllers: [SecurityController],
  providers: [AuthenticationService, AuthorizationService, SecurityGuard],
  exports: [AuthenticationService, AuthorizationService, JwtModule, SecurityGuard],
})
export class SecurityModule {}
