import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Errors } from './errors';
import { AppError } from './app-error';


export function errorFactory(error: any): AppError {

  // =============================================================
  // 🔥 1. Prisma Known Request Error
  // =============================================================
  if (error instanceof PrismaClientKnownRequestError) {

    const model = error.meta?.modelName;   // ex: "Store" | "Center"
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

      // ============================================================
      // 🔵 CENTER — unique(name) ? (si tu le mets plus tard)
      // ============================================================
      if (model === 'Center' && target?.includes('name')) {
        return Errors.CenterAlreadyExists({
          fieldErrors: { name: 'Ce centre existe déjà.' },
        });
      }

      // ============================================================
      // 📧 Emails uniques (Center ou Store)
      // ============================================================
      if (target?.includes('email')) {
        if (model === 'Store') {
          return Errors.StoreInvalidEmail({
            fieldErrors: {
              email: "L'adresse email est déjà utilisée.",
            },
          });
        }
        if (model === 'Center') {
          return Errors.CenterInvalidEmail({
            fieldErrors: {
              email: "L'adresse email est déjà utilisée.",
            },
          });
        }
      }

      // ============================================================
      // 🟡 Fallback pour autres uniques
      // ============================================================
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

      return Errors.UnknownError();
    }

    // -------------------------------------------------------------
    // ⚠️ P2003 — Foreign key constraint failed
    // -------------------------------------------------------------
    if (error.code === 'P2003') {

      // ➜ Exemple : suppression d’un center lié à des stores
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
  // 🟡 2. Déjà un AppError → on renvoie tel quel
  // =============================================================
  if (error instanceof AppError) return error;

  // =============================================================
  // 🔴 3. Fallback erreur inconnue
  // =============================================================
  return Errors.UnknownError();
}
