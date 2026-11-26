import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import type { Speaker } from "@/types/speaker";
import { Box, Flex } from "@chakra-ui/react";

import { SpeakerSessionLink } from "./speaker-session-link";

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
              <SpeakerSessionLink session={session} />
            </Box>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
