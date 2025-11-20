import { IsNotEmpty, IsString } from 'class-validator';

export class AuthenticationCredentialRequest {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
