// AppError est une classe qui représente une erreur MÉTIER dans ton application.
// Pas une erreur JavaScript classique, mais une erreur que TU contrôles.
//
// Exemples d’erreurs métier :
// - “Un centre avec ce nom existe déjà”
// - “Le code postal est invalide”
// - “Vous n’avez pas les droits nécessaires”
// - “Utilisateur introuvable”
//
// L’intérêt de cette classe est de pouvoir renvoyer des erreurs STRUCTURÉES
// et COMPRÉHENSIBLES par le frontend, au lieu d’un simple message string.
export class AppError<TDetails = any> {

  // code : identifiant unique de l’erreur.
  //
  // Exemple :
  // - "CENTER_ALREADY_EXISTS"
  // - "INVALID_POSTAL_CODE"
  //
  // Le frontend peut utiliser ce code pour :
  // - traduire l’erreur
  // - afficher un message spécifique
  // - réagir différemment selon le type d’erreur
  readonly code: string;

  // message : une phrase compréhensible par un humain.
  //
  // Exemples :
  // - "Un centre avec ce nom existe déjà"
  // - "Le code postal doit contenir 5 chiffres"
  //
  // C’est ce que tu affiches dans l’UI.
  readonly message: string;

  // status : le code HTTP de l’erreur.
  //
  // Exemples :
  // - 400 (Bad Request)
  // - 404 (Not Found)
  // - 401 (Unauthorized)
  // - 500 (Server Error)
  //
  // Le frontend peut l’utiliser pour savoir la gravité de l'erreur.
  readonly status: number;

  // details : objet contenant des informations STRUCTURÉES
  // qui permettent d'afficher les erreurs précisément.
  //
  // C’est un type générique <TDetails> pour que tu puisses personnaliser
  // le type des "détails".
  //
  // Par exemple, pour valider un formulaire, tu vas envoyer :
  // {
  //   fieldErrors: {
  //     name: "Nom déjà utilisé",
  //     codePostal: "Code postal invalide"
  //   }
  // }
  //
  // Pour une erreur d’authentification :
  // {
  //   reason: "token_expired"
  // }
  //
  // L’intérêt : tu peux adapter les "details" à CHAQUE type d’erreur.
  readonly details?: TDetails;

  // Le constructeur permet de créer facilement une erreur.
  //
  // params est un objet contenant toutes les propriétés.
  // Cela permet d'écrire :
  //
  // new AppError({
  //   code: "CENTER_ALREADY_EXISTS",
  //   message: "Un centre avec ce nom existe déjà",
  //   status: 400,
  //   details: {
  //     fieldErrors: {
  //       name: "Nom déjà utilisé"
  //     }
  //   }
  // })
  //
  // Très lisible, très propre, et facile à utiliser.
  constructor(params: {
    code: string;
    message: string;
    status: number;
    details?: TDetails;
  }) {

    // On copie les valeurs dans l’objet.
    this.code = params.code;
    this.message = params.message;
    this.status = params.status;
    this.details = params.details;
  }
}
