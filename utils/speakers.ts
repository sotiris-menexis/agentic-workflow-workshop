import type { Session } from "@/types/session";
import type { Speaker } from "@/types/speaker";

/**
 * `speaker` values that stand for a group, not a person — the closing panel is
 * listed under "Full speaker lineup". They get no card of their own.
 */
const NON_SPEAKER_NAMES = new Set(["Full speaker lineup"]);

/**
 * Groups sessions by speaker: one entry per speaker, sorted by name, each with
 * their sessions in start-time order.
 */
export function getSpeakersFromSessions(sessions: Session[]): Speaker[] {
  const byName = new Map<string, Speaker>();

  for (const { id, title, startTime, speaker } of sessions) {
    const name = speaker.trim();
    if (!name) {
      // Unexpected data: this session would otherwise vanish from the page silently.
      console.warn("[speakers] skipped session with a blank speaker:", id);
      continue;
    }
    if (NON_SPEAKER_NAMES.has(name)) continue;

    const entry = byName.get(name) ?? { name, sessions: [] };
    entry.sessions.push({ id, title, startTime });
    byName.set(name, entry);
  }

  return Array.from(byName.values())
    .map((entry) => ({
      ...entry,
      // "HH:MM" strings sort chronologically as plain text.
      sessions: entry.sessions.toSorted((a, b) =>
        a.startTime.localeCompare(b.startTime),
      ),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
