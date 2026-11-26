import { Link } from "@/i18n/navigation";
import type { SpeakerSession } from "@/types/speaker";
import { Flex, Text, VisuallyHidden } from "@chakra-ui/react";

interface SpeakerSessionLinkProps {
  session: SpeakerSession;
}

/** One session in a speaker card: start time over an underlined title. */
export function SpeakerSessionLink({ session }: SpeakerSessionLinkProps) {
  return (
    <Link href={`/sessions/${session.id}`}>
      <Flex as="span" direction="column" gap="0.5" fontSize="sm">
        <Text asChild color="var(--text-secondary)">
          <time dateTime={session.startTime}>{session.startTime}</time>
        </Text>
        {/* Keeps the link's name "12:15, Title" without relying on layout. */}
        <VisuallyHidden>,</VisuallyHidden>{" "}
        <Text
          as="span"
          textDecoration="underline"
          textDecorationColor="var(--link-underline)"
          textUnderlineOffset="3px"
          transition="color 0.2s, text-decoration-color 0.2s"
          css={{
            "a:is(:hover, :focus-visible) &": {
              color: "var(--accent-text)",
              textDecorationColor: "currentColor",
            },
          }}
        >
          {session.title}
        </Text>
      </Flex>
    </Link>
  );
}
