// app/utils/auth.js

export function saveAuth(user) {
  if (typeof window === "undefined") return;
  localStorage.setItem("pharmacyUser", JSON.stringify(user));
}

export function getAuth() {
  if (typeof window === "undefined") return null;
  const str = localStorage.getItem("pharmacyUser");
  return str ? JSON.parse(str) : null;
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("pharmacyUser");
}
