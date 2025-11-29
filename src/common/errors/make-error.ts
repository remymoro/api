import { AppError } from './app-error';

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
  code: string,
  message: string,
  status: number,
) {
  return (details?: TDetails) => {
    return new AppError<TDetails>(
      code,          // 1️⃣
      message,       // 2️⃣
      status,        // 3️⃣
      details,       // 4️⃣ (optionnel)
    );
  };
}
