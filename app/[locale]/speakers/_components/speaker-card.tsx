import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Speaker } from "@/types/speaker";
import { Box, Flex, Text, VisuallyHidden } from "@chakra-ui/react";

interface SpeakerCardProps {
  speaker: Speaker;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardHeader paddingBottom="0">
        <CardTitle as="h2" fontSize="lg" fontWeight="semibold">
          {speaker.name}
        </CardTitle>
      </CardHeader>

      <CardContent paddingTop="3">
        {/* role="list": WebKit drops list semantics from an unstyled <ul>. */}
        <Flex
          as="ul"
          role="list"
          direction="column"
          gap="3"
          listStyleType="none"
        >
          {speaker.sessions.map((session) => (
            <Box as="li" key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Flex as="span" direction="column" gap="0.5" fontSize="sm">
                  <Text asChild color="var(--text-secondary)">
                    <time dateTime={session.startTime}>
                      {session.startTime}
                    </time>
                  </Text>
                  {/* Keeps the link's name "12:15, Title" without relying on layout. */}
                  <VisuallyHidden>,</VisuallyHidden>{" "}
                  <Text
                    as="span"
                    textDecoration="underline"
                    textDecorationColor="var(--card-border-hover-hex)"
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
            </Box>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
