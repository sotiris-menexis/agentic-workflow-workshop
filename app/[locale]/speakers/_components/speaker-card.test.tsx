import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Speaker } from "@/types/speaker";

import { SpeakerCard } from "./speaker-card";

const speaker: Speaker = {
  name: "Marta Fernandez",
  sessions: [
    { id: "opening-keynote", title: "Opening Keynote", startTime: "09:00" },
    { id: "afternoon-talk", title: "Afternoon Talk", startTime: "15:00" },
  ],
};

describe("SpeakerCard", () => {
  it("shows the speaker's name as a heading", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Marta Fernandez" }),
    ).toBeInTheDocument();
  });

  it("links each session to its page, with its start time and title", () => {
    render(<SpeakerCard speaker={speaker} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/en/sessions/opening-keynote");
    expect(links[0]).toHaveTextContent("09:00");
    expect(links[0]).toHaveTextContent("Opening Keynote");
    expect(links[1]).toHaveAttribute("href", "/en/sessions/afternoon-talk");
  });
});
