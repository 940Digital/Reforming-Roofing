// Thin wrapper around the 940Digital tracker (www.940digital.com/tracker.js). Safe to call before the
// script loads, when it is blocked, and in local dev: it does nothing in those cases.
declare global {
  interface Window {
    t940?: {
      track: (name: string, opts?: { value?: number; props?: Record<string, string | number | boolean> }) => void;
      sessionId?: () => string | null;
    };
  }
}

export const track = (name: string) => window.t940?.track(name);

/** The tracker's id for this visit, or null when the tracker is blocked, off, or not loaded yet. */
export const trackerSessionId = (): string | null => {
  try {
    return window.t940?.sessionId?.() ?? null;
  } catch {
    return null;
  }
};
