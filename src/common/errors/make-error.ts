import { AppError } from './app-error';
import { AppErrorCode } from './app-error-code';

// makeError est une "factory", une usine qui sert à créer
// des erreurs AppError facilement ET de manière uniformisée.
//
// Plutôt que d’écrire :
//
// throw new AppError({
//   code: 'CENTER_ALREADY_EXISTS',
//   message: 'Un centre existe déjà',
//   status: 400,
//   details: { fieldErrors: { name: '...' } }
// })
//
// ON PEUT écrire :
//
// throw Errors.CenterAlreadyExists({ fieldErrors: ... })
//
// C’est plus propre, plus maintenable, plus pro.
export function makeError<TDetails = any>(
  code: AppErrorCode,     // le code unique de l’erreur (enum)
  message: string,        // message humain par défaut
  status: number,         // code HTTP
) {

  // Cette fonction retourne un constructeur D’ERREUR.
  //
  // On peut l'appeler plus tard avec des "details".
  //
  // Exemple :
  // const err = CenterAlreadyExists({ fieldErrors: { name: "..." }})
  // -> err est un AppError
  return (details?: TDetails) =>
    new AppError<TDetails>({
      code,
      message,
      status,
      details,
    });
}
