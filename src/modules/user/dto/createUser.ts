import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { hash } from '../../../helpers/utils';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  public readonly login: string;

  @IsNotEmpty()
  @IsString()
  public readonly password: string;
}
