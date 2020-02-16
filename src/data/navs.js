export const headerNav = [
  { title: "mon compte", isSelected: false, path: "/mon-compte/" },
  { title: "mes jeux", isSelected: false, path: "/mes-jeux/" },
  { title: "connexion", isSelected: false, path: "/connexion/" },
  { title: "inscription", isSelected: false, path: "/inscription/" },
  { title: "déconnexion" }
];

export const sitePlanNav = [
  { title: "Plan du site", isSelected: false, path: "plan-du-site/" },
  { title: "Besoin d'aide ?", isSelected: false, path: "aide/" },
  { title: "Sitemap", isSelected: false, path: "sitemap/" },
];

export const aproposNav = [
  { title: "Assitance", isSelected: false, path: "assitance/" },
  { title: "Qui sommes nous ?", isSelected: false, path: "a-propos/" },
  { title: "Charte de confidentialité", isSelected: false, path: "charte-confidentialite/" },
  { title: "Conditions Générales d'Utilisation", isSelected: false, path: "cgu/" },
];

export const legalsNav = [
  { title: "Mentions légales", isSelected: false, path: "mentions-legales/" },
  { title: "Informations légales", isSelected: false, path: "informations-legales/" },
];

export const accountMenu = [
  {
    title: "Mon Compte", view: "account", isSelected: true, icon: "user"
  },
  {
    title: "Changer de mot passe", view: "pass", isSelected: false, icon: "key"
  },
  {
    title: "Données privées", view: "privacy", isSelected: false, icon: "eye"
  },
  {
    title: "Changer d'Email", view: "email", isSelected: false, icon: "at"
  },
  {
    title: "Mes articles", view: "posts", isSelected: false, icon: "newspaper"
  },
  {
    title: "Supprimer mon compte", view: "delete", isSelected: false, icon: "delete"
  },
];
