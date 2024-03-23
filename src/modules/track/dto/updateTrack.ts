import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsOptional()
  @IsString()
  public readonly artistId: string | null;

  @IsOptional()
  @IsString()
  public readonly albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  public readonly duration: number;
}
