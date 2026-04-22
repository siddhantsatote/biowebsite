const ADMIN_AUTH_STORAGE_KEY = "bioenergy_admin_authenticated";

const configuredUsername = import.meta.env.VITE_ADMIN_USERNAME;
const configuredPassword = import.meta.env.VITE_ADMIN_PASSWORD;

const fallbackUsername = "admin";
const fallbackPassword = "BioEnergy@2026";

export function getAdminCredentials() {
  return {
    username: configuredUsername || fallbackUsername,
    password: configuredPassword || fallbackPassword,
  };
}

export function verifyAdminCredentials(username: string, password: string) {
  const credentials = getAdminCredentials();
  return username === credentials.username && password === credentials.password;
}

export function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === "true";
}

export function setAdminAuthenticated() {
  sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, "true");
}

export function clearAdminAuthenticated() {
  sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
}
