// AppErrorCode est une énumération (enum) qui liste
// toutes les erreurs MÉTIER possibles dans ton application.
//
// Chaque erreur doit avoir un identifiant UNIQUE et IMMUTABLE.
// Cet identifiant est utilisé :
//  - dans le backend (pour lancer l'erreur)
//  - dans le frontend (pour réagir correctement)
//  - dans les logs / monitoring
//  - dans les tests
//
// Exemple :
//  si tu renvoies CENTER_ALREADY_EXISTS,
//  alors le frontend sait qui est concerné
//  (le module "center") et pourquoi.
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
  // 🔶 VALIDATION GENERIQUE
  // -----------------------------------------------------
  VALIDATION_FAILED = 'VALIDATION_FAILED',

  // -----------------------------------------------------
  // 🔴 GLOBAL
  // -----------------------------------------------------
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}
