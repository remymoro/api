import { IsInt, IsNotEmpty, IsOptional, IsString, IsEmail, MinLength, MaxLength } from 'class-validator';



export class CreateStoreDto {
  // -----------------------------------------
  // 🏷️ Nom du magasin
  // -----------------------------------------
  @IsString()
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  @MaxLength(100)
  name: string;

  // -----------------------------------------
  // 📍 Adresse postale
  // -----------------------------------------
  @IsString()
  @IsNotEmpty({ message: "L'adresse est obligatoire." })
  @MaxLength(255)
  address: string;

  // -----------------------------------------
  // 🏙️ Ville
  // -----------------------------------------
  @IsString()
  @IsNotEmpty({ message: 'La ville est obligatoire.' })
  city: string;

  // -----------------------------------------
  // 📮 Code postal
  // -----------------------------------------
  @IsString()
  @IsNotEmpty({ message: 'Le code postal est obligatoire.' })
  @MinLength(4)
  @MaxLength(10)
  codePostal: string;

  // -----------------------------------------
  // 📞 Téléphone (optionnel)
  // -----------------------------------------
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  // -----------------------------------------
  // 📧 Email (optionnel)
  // -----------------------------------------
  @IsOptional()
  @IsEmail({}, { message: "L'adresse e-mail est invalide." })
  @MaxLength(150)
  email?: string;

  // -----------------------------------------
  // 🖼️ URL image (optionnel)
  // -----------------------------------------
  @IsOptional()
  @IsString()
  img?: string;

  // -----------------------------------------
  // 🏬 Relation obligatoire vers Center
  // -----------------------------------------
  @IsInt({ message: 'centerId doit être un nombre.' })
  centerId: number;
}
