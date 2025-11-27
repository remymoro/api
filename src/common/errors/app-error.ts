export class AppError<TDetails = any> extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly globalError: string;   // 🔥 NOUVEAU
  public readonly details?: TDetails;

  constructor(
    code: string,
    message: string,
    status: number,
    details?: TDetails,
  ) {
    super(message);
    this.code = code;
    this.status = status;

    // 👉 Ajout du champ globalError
    this.globalError = message;

    if (details) {
      this.details = details;
    }
  }
}
