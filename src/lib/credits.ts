const STORAGE_KEY = 'rewearCredits';

export function getCredits(): number {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    localStorage.setItem(STORAGE_KEY, '5');
    return 5;
  }
  const parsed = parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : 5;
}

export function setCredits(next: number): void {
  const sanitized = Math.max(0, Math.floor(next));
  localStorage.setItem(STORAGE_KEY, String(sanitized));
  window.dispatchEvent(new CustomEvent<number>('credits:update', { detail: sanitized }));
}

export function addCredits(delta: number): void {
  const current = getCredits();
  setCredits(current + delta);
}


