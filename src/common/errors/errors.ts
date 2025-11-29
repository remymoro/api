import { AppErrorCode } from './app-error-code';
import { makeError } from './make-error';

// Détails typiques pour une erreur contenant des erreurs de champs
export type ValidationDetails = {
  fieldErrors?: Record<string, string>;
};

export const Errors = {

  // ==========================================================
  // 🔵 CENTER
  // ==========================================================
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

  // ==========================================================
  // 🟣 STORE
  // ==========================================================
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

  // ==========================================================
  // 🟢 USER (Admin)
  // ==========================================================
  UserAlreadyExists: makeError<ValidationDetails>(
    AppErrorCode.USER_ALREADY_EXISTS,
    "Un utilisateur avec ces informations existe déjà.",
    400,
  ),

  UserNotFound: makeError(
    AppErrorCode.USER_NOT_FOUND,
    'Utilisateur non trouvé.',
    404,
  ),

  UserInvalidEmail: makeError<ValidationDetails>(
    AppErrorCode.USER_INVALID_EMAIL,
    "L'adresse e-mail de l'utilisateur est invalide.",
    400,
  ),

  UserPasswordTooWeak: makeError<ValidationDetails>(
    AppErrorCode.USER_PASSWORD_TOO_WEAK,
    'Le mot de passe est trop faible.',
    400,
  ),

  UserRoleInvalid: makeError<ValidationDetails>(
    AppErrorCode.USER_ROLE_INVALID,
    'Le rôle spécifié est invalide.',
    400,
  ),

  UserCreationForbidden: makeError(
    AppErrorCode.USER_CREATION_FORBIDDEN,
    "Vous n'avez pas la permission de créer cet utilisateur.",
    403,
  ),

  UserCannotDeleteSelf: makeError(
    AppErrorCode.USER_CANNOT_DELETE_SELF,
    "Vous ne pouvez pas supprimer votre propre compte.",
    400,
  ),

  UserIsLastAdmin: makeError(
    AppErrorCode.USER_IS_LAST_ADMIN,
    "Impossible de supprimer le dernier administrateur.",
    400,
  ),

  UserMustHaveCenter: makeError(
    AppErrorCode.USER_MUST_HAVE_CENTER,
    "Les utilisateurs de type 'RESPONSABLE' ou 'BENEVOLE' doivent être rattachés à un centre.",
    400,
  ),

  UserCannotChangeRole: makeError(
    AppErrorCode.USER_CANNOT_CHANGE_ROLE,
    "Vous ne pouvez pas modifier ce rôle.",
    403,
  ),

  UserValidationFailed: makeError<ValidationDetails>(
    AppErrorCode.USER_VALIDATION_FAILED,
    "Certains champs de l'utilisateur sont invalides.",
    400,
  ),

  // ==========================================================
  // 🔐 AUTH
  // ==========================================================
  AuthInvalidCredentials: makeError(
    AppErrorCode.AUTH_INVALID_CREDENTIALS,
    'Identifiants invalides.',
    401,
  ),

  AuthUserDisabled: makeError(
    AppErrorCode.AUTH_USER_DISABLED,
    'Ce compte est désactivé.',
    403,
  ),

  AuthTokenExpired: makeError(
    AppErrorCode.AUTH_TOKEN_EXPIRED,
    'Votre session a expiré.',
    401,
  ),

  AuthTokenInvalid: makeError(
    AppErrorCode.AUTH_TOKEN_INVALID,
    "Le jeton d'authentification est invalide.",
    401,
  ),

  AuthForbidden: makeError(
    AppErrorCode.AUTH_FORBIDDEN,
    "Vous n'avez pas les droits nécessaires.",
    403,
  ),

  AuthUnauthorized: makeError(
    AppErrorCode.AUTH_UNAUTHORIZED,
    "Vous devez être authentifié pour accéder à cette ressource.",
    401,
  ),

  AuthUsernameAlreadyExists: makeError<ValidationDetails>(
    AppErrorCode.AUTH_USERNAME_ALREADY_EXISTS,
    'Ce nom d’utilisateur est déjà utilisé.',
    400,
  ),

  // ==========================================================
  // 🔶 VALIDATION GÉNÉRIQUE
  // ==========================================================
  ValidationFailed: makeError<ValidationDetails>(
    AppErrorCode.VALIDATION_FAILED,
    'Un ou plusieurs champs sont invalides.',
    400,
  ),

  // ==========================================================
  // 🔴 GLOBAL
  // ==========================================================
  UnknownError: makeError(
    AppErrorCode.UNKNOWN_ERROR,
    'Une erreur interne est survenue.',
    500,
  ),
};
