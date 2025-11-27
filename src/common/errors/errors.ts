import { AppErrorCode } from './app-error-code';
import { makeError } from './make-error';

// Le catalogue d'erreurs métier
// Chaque entrée est une fonction créée par makeError()

// Détails typiques pour une erreur de validation de champ
export type ValidationDetails = {
  fieldErrors?: Record<string, string>;
};




// =============================================================
// 🎯 CATALOGUE DES ERREURS MÉTIER
// Chaque entrée est une "recette" de AppError (analogie cuisine)
// =============================================================



export const Errors = {

  // ---------------------------------------------------------
  // 🔵 CENTER
  // ---------------------------------------------------------
  CenterAlreadyExists: makeError<ValidationDetails>(
    AppErrorCode.CENTER_ALREADY_EXISTS,
    'Un centre avec ces informations existe déjà.',
    400,
  ),

  CenterNotFound: makeError(
    AppErrorCode.CENTER_NOT_FOUND,
    'Centre non trouvé.',
    404,
  ),

  CenterInvalidPhone: makeError<ValidationDetails>(
    AppErrorCode.CENTER_INVALID_PHONE,
    'Numéro de téléphone invalide.',
    400,
  ),

  CenterInvalidEmail: makeError<ValidationDetails>(
    AppErrorCode.CENTER_INVALID_EMAIL,
    'Adresse e-mail invalide.',
    400,
  ),

  CenterInvalidAddress: makeError<ValidationDetails>(
    AppErrorCode.CENTER_INVALID_ADDRESS,
    "L'adresse du centre est invalide.",
    400,
  ),

  CenterInvalidPostalCode: makeError<ValidationDetails>(
    AppErrorCode.CENTER_INVALID_POSTAL_CODE,
    'Le code postal est invalide.',
    400,
  ),

  CenterValidationFailed: makeError<ValidationDetails>(
    AppErrorCode.CENTER_VALIDATION_FAILED,
    'Certains champs du centre sont invalides.',
    400,
  ),

  // ---------------------------------------------------------
  // 🟣 STORE
  // ---------------------------------------------------------
  StoreAlreadyExists: makeError<ValidationDetails>(
    AppErrorCode.STORE_ALREADY_EXISTS,
    'Un magasin avec ces informations existe déjà.',
    400,
  ),

  StoreNotFound: makeError(
    AppErrorCode.STORE_NOT_FOUND,
    'Magasin non trouvé.',
    404,
  ),

  StoreInvalidPhone: makeError<ValidationDetails>(
    AppErrorCode.STORE_INVALID_PHONE,
    'Numéro de téléphone invalide.',
    400,
  ),

  StoreInvalidEmail: makeError<ValidationDetails>(
    AppErrorCode.STORE_INVALID_EMAIL,
    'Adresse e-mail invalide.',
    400,
  ),

  StoreInvalidAddress: makeError<ValidationDetails>(
    AppErrorCode.STORE_INVALID_ADDRESS,
    "L'adresse du magasin est invalide.",
    400,
  ),

  StoreInvalidPostalCode: makeError<ValidationDetails>(
    AppErrorCode.STORE_INVALID_POSTAL_CODE,
    'Le code postal est invalide.',
    400,
  ),

  StoreValidationFailed: makeError<ValidationDetails>(
    AppErrorCode.STORE_VALIDATION_FAILED,
    'Certains champs du magasin sont invalides.',
    400,
  ),

  // ---------------------------------------------------------
  // 🔶 VALIDATION GENERIQUE
  // ---------------------------------------------------------
  ValidationFailed: makeError<ValidationDetails>(
    AppErrorCode.VALIDATION_FAILED,
    'Un ou plusieurs champs sont invalides.',
    400,
  ),

  // ---------------------------------------------------------
  // 🔴 GLOBAL
  // ---------------------------------------------------------
  UnknownError: makeError(
    AppErrorCode.UNKNOWN_ERROR,
    'Une erreur interne est survenue.',
    500,
  ),
};
