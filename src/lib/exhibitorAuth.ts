type ExhibitorSession = {
  id: string;
  booth_name: string;
  company_name: string;
  contact_name: string;
  email: string;
};

const EXHIBITOR_AUTH_STORAGE_KEY = "bioenergy_exhibitor_authenticated";

export function getExhibitorSession(): ExhibitorSession | null {
  const raw = sessionStorage.getItem(EXHIBITOR_AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as ExhibitorSession;
  } catch {
    sessionStorage.removeItem(EXHIBITOR_AUTH_STORAGE_KEY);
    return null;
  }
}

export function isExhibitorAuthenticated() {
  return Boolean(getExhibitorSession());
}

export function setExhibitorSession(session: ExhibitorSession) {
  sessionStorage.setItem(EXHIBITOR_AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearExhibitorSession() {
  sessionStorage.removeItem(EXHIBITOR_AUTH_STORAGE_KEY);
}
