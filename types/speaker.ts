import type { Session } from "./session";

/** The part of a session a speaker card shows. */
export type SpeakerSession = Pick<Session, "id" | "title" | "startTime">;

/** One speaker and the sessions they give, in start-time order. */
export interface Speaker {
  name: string;
  sessions: SpeakerSession[];
}
