import { describe, expect, it, vi } from "vitest";

import type { Session } from "@/types/session";

import { getSpeakersFromSessions } from "./speakers";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("getSpeakersFromSessions", () => {
  it("returns one speaker per name, sorted by name", () => {
    const speakers = getSpeakersFromSessions([
      session({ id: "s1", speaker: "Pablo Iglesias" }),
      session({ id: "s2", speaker: "Diego Castellanos" }),
      session({ id: "s3", speaker: "Marta Fernandez" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual([
      "Diego Castellanos",
      "Marta Fernandez",
      "Pablo Iglesias",
    ]);
  });

  it("groups every session a speaker gives, in start-time order", () => {
    const speakers = getSpeakersFromSessions([
      session({ id: "late", title: "Late", startTime: "15:00" }),
      session({ id: "early", title: "Early", startTime: "09:30" }),
    ]);

    expect(speakers).toEqual([
      {
        name: "A speaker",
        sessions: [
          { id: "early", title: "Early", startTime: "09:30" },
          { id: "late", title: "Late", startTime: "15:00" },
        ],
      },
    ]);
  });

  it("leaves out the closing panel's group placeholder", () => {
    const speakers = getSpeakersFromSessions([
      session({ id: "keynote", speaker: "Marta Fernandez" }),
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual([
      "Marta Fernandez",
    ]);
  });

  it("groups names that differ only by surrounding whitespace", () => {
    const speakers = getSpeakersFromSessions([
      session({ id: "s1", speaker: "Marta Fernandez" }),
      session({ id: "s2", speaker: "  Marta Fernandez " }),
    ]);

    expect(speakers).toHaveLength(1);
    expect(speakers[0].name).toBe("Marta Fernandez");
    expect(speakers[0].sessions).toHaveLength(2);
  });

  it("skips a session with a blank speaker and warns about it", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const speakers = getSpeakersFromSessions([
      session({ id: "keynote", speaker: "Marta Fernandez" }),
      session({ id: "mystery", speaker: "   " }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual([
      "Marta Fernandez",
    ]);
    expect(warn).toHaveBeenCalledWith(
      "[speakers] skipped session with a blank speaker:",
      "mystery",
    );
    warn.mockRestore();
  });

  it("does not warn about the closing panel's placeholder", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    getSpeakersFromSessions([
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
    ]);

    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("returns nothing for no sessions", () => {
    expect(getSpeakersFromSessions([])).toEqual([]);
  });
});
