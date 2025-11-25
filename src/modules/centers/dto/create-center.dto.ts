import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';


export class CreateCenterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  city: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{5}$/, {
    message: 'Le code postal doit contenir 5 chiffres',
  })
  codePostal: string;
}
