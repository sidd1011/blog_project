/**
 * =====================================================================
 * Admin Authentication Utilities (src/lib/auth.ts)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Provides credentials definition, cookie constants, and session token
 * generation & validation for DevLearn CMS Admin Portal.
 * Universal Web Crypto support for both Node.js and Edge Middleware runtimes.
 * =====================================================================
 */

export const ADMIN_AUTH_COOKIE = "devlearn_admin_token";

// Configured Admin Credentials
export const ADMIN_CREDENTIALS = {
  email: "Sidd@gmail.com",
  password: "Sidd@123",
  user: {
    id: "usr-siddhartha",
    name: "Siddhartha Kumar",
    email: "Sidd@gmail.com",
    role: "admin" as const,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
};

const SECRET_KEY = "devlearn_super_secure_admin_jwt_secret_key_2026";

/**
 * Creates a signed auth token with expiration timestamp
 */
export function createSessionToken(email: string): string {
  const payload = {
    email: email.toLowerCase(),
    role: "admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const jsonStr = JSON.stringify(payload);
  const base64Payload = typeof Buffer !== "undefined" 
    ? Buffer.from(jsonStr).toString("base64url")
    : btoa(jsonStr);

  // Generate lightweight signature
  const signature = createSimpleSig(base64Payload, SECRET_KEY);
  return `${base64Payload}.${signature}`;
}

/**
 * Validates a session token
 */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [base64Payload, signature] = parts;
  const expectedSig = createSimpleSig(base64Payload, SECRET_KEY);
  if (signature !== expectedSig) return false;

  try {
    const jsonStr = typeof Buffer !== "undefined"
      ? Buffer.from(base64Payload, "base64url").toString("utf-8")
      : atob(base64Payload);
    const data = JSON.parse(jsonStr);

    if (!data.exp || data.exp < Date.now()) {
      return false;
    }
    if (data.email !== ADMIN_CREDENTIALS.email.toLowerCase()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Simple deterministic hashing for Edge & Node compatibility
 */
function createSimpleSig(input: string, secret: string): string {
  let hash = 0;
  const combined = `${input}:${secret}`;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}
