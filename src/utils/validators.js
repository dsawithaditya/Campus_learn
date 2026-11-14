/**
 * Validates academic email addresses accepted across Campus Learn onboarding & auth flows.
 */
export function isValidCollegeEmail(raw) {
  const normalized = (raw || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(normalized)) return false;
  return (
    normalized.endsWith('.edu') ||
    normalized.endsWith('.ac.in') ||
    normalized.endsWith('.edu.in') ||
    normalized.includes('@college.')
  );
}
