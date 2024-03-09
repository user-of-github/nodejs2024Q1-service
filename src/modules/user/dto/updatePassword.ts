import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  public readonly oldPassword: string;

  @IsNotEmpty()
  public readonly newPassword: string;
}
