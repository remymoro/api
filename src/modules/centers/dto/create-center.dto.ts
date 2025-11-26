import { IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsOptional, IsEmail } from 'class-validator';



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

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  address: string;

  @IsString()
  @IsOptional()
  @Matches(/^[0-9+().\-\s]{8,20}$/, {
    message: 'Le numéro de téléphone est invalide',
  })
  phone?: string;

  @IsEmail({}, { message: 'Adresse e-mail invalide' })
  @IsOptional()
  email?: string;
}
