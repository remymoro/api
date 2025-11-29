import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from './app-error';
import { Errors } from './errors';

/**
 * ============================================================
 * 🔥 errorFactory
 * ------------------------------------------------------------
 * Convertit TOUTES les erreurs en AppError :
 *  - Prisma (P2002 / P2025 / P2003)
 *  - Erreurs métier de ton code → AppError directement
 *  - Erreurs Auth
 *  - Erreurs User
 *  - Fallback global unknown
 * ============================================================
 */
export function errorFactory(error: any): AppError {

  // =============================================================
  // 1️⃣ Prisma Known Error
  // =============================================================
  if (error instanceof PrismaClientKnownRequestError) {

    const model = error.meta?.modelName;   // ex: "Store" | "Center" | "User"
    const target = error.meta?.target as string[] | undefined;

    // -------------------------------------------------------------
    // 🔵 P2002 — Unique constraint violation
    // -------------------------------------------------------------
    if (error.code === 'P2002') {

      // ============================================================
      // 🟣 STORE — unique([address, city, codePostal])
      // ============================================================
      if (model === 'Store') {
        if (
          target?.includes('address') ||
          target?.includes('city') ||
          target?.includes('codePostal')
        ) {
          return Errors.StoreAlreadyExists({
            fieldErrors: {
              address: 'Un magasin existe déjà à cette adresse.',
            },
          });
        }
      }

      // -------------------------------------------------------------
      // 🔵 CENTER — unique(name)
      // -------------------------------------------------------------
      if (model === 'Center' && target?.includes('name')) {
        return Errors.CenterAlreadyExists({
          fieldErrors: { name: 'Ce centre existe déjà.' },
        });
      }

      // -------------------------------------------------------------
      // 🔵 EMAIL — unique email pour User / Center / Store
      // -------------------------------------------------------------
      if (target?.includes('email')) {
        if (model === 'Store') {
          return Errors.StoreInvalidEmail({
            fieldErrors: { email: "L'adresse email est déjà utilisée." },
          });
        }
        if (model === 'Center') {
          return Errors.CenterInvalidEmail({
            fieldErrors: { email: "L'adresse email est déjà utilisée." },
          });
        }
        if (model === 'User') {
          return Errors.UserAlreadyExists({
            fieldErrors: { email: "L'adresse email est déjà utilisée." },
          });
        }
      }

      // -------------------------------------------------------------
      // 🟡 Autres uniques
      // -------------------------------------------------------------
      return Errors.ValidationFailed({
        fieldErrors: {
          [target?.join(', ') ?? 'unknown']: 'Valeur déjà utilisée.',
        },
      });
    }

    // -------------------------------------------------------------
    // 🔴 P2025 — Record not found
    // -------------------------------------------------------------
    if (error.code === 'P2025') {

      if (model === 'Store') return Errors.StoreNotFound();
      if (model === 'Center') return Errors.CenterNotFound();
      if (model === 'User') return Errors.UserNotFound();

      return Errors.UnknownError();
    }

    // -------------------------------------------------------------
    // ⚠️ P2003 — Foreign key constraint failed
    // -------------------------------------------------------------
    if (error.code === 'P2003') {

      // Exemple : suppression d’un center avec stores liés
      if (model === 'Store' && error.meta?.field_name === 'centerId') {
        return Errors.ValidationFailed({
          fieldErrors: {
            centerId: "Impossible de supprimer ce centre : des magasins y sont encore rattachés.",
          },
        });
      }

      return Errors.UnknownError();
    }
  }

  // =============================================================
  // 2️⃣ AppError déjà construit → retourner tel quel
  // =============================================================
  if (error instanceof AppError) return error;

  // =============================================================
  // 3️⃣ Erreurs AUTH (token, credentials…) venant de libs externes
  // =============================================================
  if (error?.name === 'TokenExpiredError') {
    return Errors.AuthTokenExpired();
  }
  if (error?.name === 'JsonWebTokenError') {
    return Errors.AuthTokenInvalid();

  }

  // =============================================================
  // 4️⃣ Fallback erreur inconnue
  // =============================================================
  return Errors.UnknownError();
}
