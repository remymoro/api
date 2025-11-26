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

  // ---------------------------------------------------
  // 🔵 CENTER : Ressource / Doublon
  // ---------------------------------------------------

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

  // ---------------------------------------------------
  // 🟡 CENTER : Erreurs de validation METIER
  // ---------------------------------------------------

  CenterInvalidPhone: makeError<ValidationDetails>(
    AppErrorCode.CENTER_INVALID_PHONE,
    'Le numéro de téléphone est invalide.',
    400,
  ),

  CenterInvalidEmail: makeError<ValidationDetails>(
    AppErrorCode.CENTER_INVALID_EMAIL,
    'Adresse e-mail invalide.',
    400,
  ),

  CenterInvalidAddress: makeError<ValidationDetails>(
    AppErrorCode.CENTER_INVALID_ADDRESS,
    'Adresse du centre invalide.',
    400,
  ),

  CenterValidationFailed: makeError<ValidationDetails>(
    AppErrorCode.CENTER_VALIDATION_FAILED,
    'Certains champs du centre sont invalides.',
    400,
  ),

  CenterInvalidPostalCode: makeError<ValidationDetails>(
    AppErrorCode.CENTER_INVALID_POSTAL_CODE,
    'Le code postal est invalide.',
    400,
  ),

  // ---------------------------------------------------
  // 🔴 GLOBAL
  // ---------------------------------------------------
  UnknownError: makeError(
    AppErrorCode.UNKNOWN_ERROR,
    'Une erreur interne est survenue.',
    500,
  ),
};
