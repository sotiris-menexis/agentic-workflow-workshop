import { describe, expect, it } from "vitest";

import { render, screen, within } from "@/tests/utils/render";
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

  it("lists one link per session, in the given order", () => {
    render(<SpeakerCard speaker={speaker} />);

    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(within(items[0]).getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
    expect(within(items[1]).getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/afternoon-talk",
    );
  });
});
