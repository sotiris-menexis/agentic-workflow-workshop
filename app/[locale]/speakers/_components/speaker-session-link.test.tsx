import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";

import { SpeakerSessionLink } from "./speaker-session-link";

const session = {
  id: "opening-keynote",
  title: "Opening Keynote",
  startTime: "09:00",
};

describe("SpeakerSessionLink", () => {
  it("links to the session page, named by start time and title", () => {
    render(<SpeakerSessionLink session={session} />);

    // The separator is in the DOM, so the name doesn't depend on CSS layout.
    expect(
      screen.getByRole("link", { name: "09:00, Opening Keynote" }),
    ).toHaveAttribute("href", "/en/sessions/opening-keynote");
  });

  it("marks up the start time as a machine-readable time", () => {
    render(<SpeakerSessionLink session={session} />);

    expect(screen.getByText("09:00").closest("time")).toHaveAttribute(
      "dateTime",
      "09:00",
    );
  });
});
