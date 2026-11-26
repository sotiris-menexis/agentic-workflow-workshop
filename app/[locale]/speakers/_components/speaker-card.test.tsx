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

  it("links each session to its page, named by start time and title", () => {
    render(<SpeakerCard speaker={speaker} />);

    // The separator is in the DOM, so the name doesn't depend on CSS layout.
    expect(
      screen.getByRole("link", { name: "09:00, Opening Keynote" }),
    ).toHaveAttribute("href", "/en/sessions/opening-keynote");
    expect(
      screen.getByRole("link", { name: "15:00, Afternoon Talk" }),
    ).toHaveAttribute("href", "/en/sessions/afternoon-talk");
  });

  it("lists the sessions as a list, with machine-readable start times", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("09:00").closest("time")).toHaveAttribute(
      "dateTime",
      "09:00",
    );
  });
});
