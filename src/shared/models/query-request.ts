import { TransformTrim } from '@shared/utilities/validator.utility';

import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryRequest {
  @TransformTrim()
  @IsString()
  @IsOptional()
  search?: string;

  @Min(1)
  @IsInt()
  @IsOptional()
  limit?: number;

  @Min(0)
  @IsInt()
  @IsOptional()
  offset?: number;
}
