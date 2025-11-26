import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Errors } from './errors';
import { AppError } from './app-error';

export function errorFactory(error: any): AppError {

  if (error instanceof PrismaClientKnownRequestError) {

    // ---------- P2002 : Unique constraint violation ----------
    if (error.code === 'P2002') {
      const target = error.meta?.target;

      if (Array.isArray(target) && target.includes('name')) {
        return Errors.CenterAlreadyExists({
          fieldErrors: { name: 'Ce nom existe déjà' },
        });
      }

      return Errors.CenterInvalidPostalCode({
        fieldErrors: { codePostal: 'Valeur déjà utilisée' },
      });
    }

    // ---------- P2025 : Record not found ----------
    if (error.code === 'P2025') {
      return Errors.CenterNotFound();
    }

    // ---------- P2003 : FK constraint ----------
    if (error.code === 'P2003') {
      return Errors.CenterInvalidPostalCode({
        fieldErrors: { codePostal: 'Référence invalide' },
      });
    }
  }

  if (error instanceof AppError) return error;

  return Errors.UnknownError();
}
