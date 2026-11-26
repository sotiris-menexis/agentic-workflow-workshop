import { beforeEach, describe, expect, it, vi } from "vitest";

import messages from "@/messages/en.json";
import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import SpeakersPage from "./page";

const { fetchSessions } = vi.hoisted(() => ({
  fetchSessions: vi.fn<() => Promise<Session[]>>(),
}));

// Supabase is the external system here; the grouping util runs for real.
vi.mock("@/services/sessions", () => ({ fetchSessions }));

// The server translator, backed by the real English catalogue so a missing
// key fails the test instead of rendering the key name.
vi.mock("next-intl/server", () => ({
  setRequestLocale: vi.fn(),
  getTranslations: async ({ namespace }: { namespace: keyof typeof messages }) =>
    (key: string) =>
      (messages[namespace] as Record<string, string>)[key] ??
      `MISSING:${namespace}.${key}`,
}));

const copy = messages.SpeakersPage;

function session(overrides: Partial<Session>): Session {
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

async function renderPage() {
  render(await SpeakersPage({ params: Promise.resolve({ locale: "en" }) }));
}

describe("SpeakersPage", () => {
  beforeEach(() => {
    fetchSessions.mockReset();
  });

  it("renders one card per speaker, sorted by name, without the panel placeholder", async () => {
    fetchSessions.mockResolvedValue([
      session({ id: "keynote", speaker: "Marta Fernandez" }),
      session({ id: "context", speaker: "Diego Castellanos" }),
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
    ]);

    await renderPage();

    expect(
      screen.getByRole("heading", { level: 1, name: copy.title }),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(["Diego Castellanos", "Marta Fernandez"]);
    expect(screen.queryByText(copy.empty)).not.toBeInTheDocument();
  });

  it("shows the empty state when there are no sessions", async () => {
    fetchSessions.mockResolvedValue([]);

    await renderPage();

    expect(screen.getByText(copy.empty)).toBeInTheDocument();
    expect(screen.queryAllByRole("heading", { level: 2 })).toHaveLength(0);
  });
});
