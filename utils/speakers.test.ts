import { describe, expect, it } from "vitest";

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

  it("returns nothing for no sessions", () => {
    expect(getSpeakersFromSessions([])).toEqual([]);
  });
});
