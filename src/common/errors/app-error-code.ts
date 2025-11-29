// AppErrorCode est une énumération (enum) qui liste
// toutes les erreurs MÉTIER possibles dans ton application.
//
// Chaque erreur doit avoir un identifiant UNIQUE et IMMUTABLE.
// Il ne faut JAMAIS renommer ces codes après mise en prod.

export enum AppErrorCode {

  // -----------------------------------------------------
  // 🔵 CENTER MODULE
  // -----------------------------------------------------
  CENTER_ALREADY_EXISTS = 'CENTER_ALREADY_EXISTS',
  CENTER_NOT_FOUND = 'CENTER_NOT_FOUND',
  CENTER_VALIDATION_FAILED = 'CENTER_VALIDATION_FAILED',
  CENTER_INVALID_PHONE = 'CENTER_INVALID_PHONE',
  CENTER_INVALID_EMAIL = 'CENTER_INVALID_EMAIL',
  CENTER_INVALID_ADDRESS = 'CENTER_INVALID_ADDRESS',
  CENTER_INVALID_POSTAL_CODE = 'CENTER_INVALID_POSTAL_CODE',

  // -----------------------------------------------------
  // 🟣 STORE MODULE
  // -----------------------------------------------------
  STORE_ALREADY_EXISTS = 'STORE_ALREADY_EXISTS',
  STORE_NOT_FOUND = 'STORE_NOT_FOUND',
  STORE_INVALID_EMAIL = 'STORE_INVALID_EMAIL',
  STORE_INVALID_PHONE = 'STORE_INVALID_PHONE',
  STORE_INVALID_ADDRESS = 'STORE_INVALID_ADDRESS',
  STORE_INVALID_POSTAL_CODE = 'STORE_INVALID_POSTAL_CODE',
  STORE_VALIDATION_FAILED = 'STORE_VALIDATION_FAILED',

  // -----------------------------------------------------
  // 🟢 USER MODULE (Admin)
  // -----------------------------------------------------
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_INVALID_EMAIL = 'USER_INVALID_EMAIL',
  USER_PASSWORD_TOO_WEAK = 'USER_PASSWORD_TOO_WEAK',
  USER_ROLE_INVALID = 'USER_ROLE_INVALID',

  // ❗ Règles métier Admin
  USER_CREATION_FORBIDDEN = 'USER_CREATION_FORBIDDEN',       // exemple : bénévole → admin interdit
  USER_CANNOT_DELETE_SELF = 'USER_CANNOT_DELETE_SELF',
  USER_CANNOT_CHANGE_ROLE = 'USER_CANNOT_CHANGE_ROLE',

  // Empêcher suppression du dernier admin
  USER_IS_LAST_ADMIN = 'USER_IS_LAST_ADMIN',

  // Les utilisateurs de type RESPONSABLE ou BENEVOLE doivent être rattachés à un centre
  USER_MUST_HAVE_CENTER = 'USER_MUST_HAVE_CENTER',

  USER_VALIDATION_FAILED = 'USER_VALIDATION_FAILED',

  // -----------------------------------------------------
  // 🔐 AUTH MODULE
  // -----------------------------------------------------
  AUTH_INVALID_CREDENTIALS = 'AUTH_INVALID_CREDENTIALS',
  AUTH_USER_DISABLED = 'AUTH_USER_DISABLED',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_INVALID = 'AUTH_TOKEN_INVALID',
  AUTH_FORBIDDEN = 'AUTH_FORBIDDEN',
  AUTH_UNAUTHORIZED = 'AUTH_UNAUTHORIZED',

  // Pour les cas où le login se fait par "username"
  AUTH_USERNAME_ALREADY_EXISTS = 'AUTH_USERNAME_ALREADY_EXISTS',

  // -----------------------------------------------------
  // 🔶 VALIDATION GENERIQUE
  // -----------------------------------------------------
  VALIDATION_FAILED = 'VALIDATION_FAILED',


  // -----------------------------------------------------
  // 🔴 GLOBAL
  // -----------------------------------------------------
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}
