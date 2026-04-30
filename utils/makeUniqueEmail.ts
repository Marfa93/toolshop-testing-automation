/**
 * Helper : Générer un email unique pour éviter les conflits d'unicité
 */
export const makeUniqueEmail = (baseEmail: string): string => {
  const [local, domain] = baseEmail.split("@");
  return `${local}.${Date.now()}@${domain}`;
};
