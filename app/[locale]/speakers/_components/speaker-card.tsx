import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Speaker } from "@/types/speaker";
import { Box, Flex, Text } from "@chakra-ui/react";

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

      <CardContent>
        <Flex as="ul" direction="column" gap="3" listStyleType="none">
          {speaker.sessions.map((session) => (
            <Box as="li" key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Flex
                  as="span"
                  direction="column"
                  gap="0.5"
                  fontSize="sm"
                  transition="color 0.2s"
                  _hover={{ color: "var(--accent-hex)" }}
                >
                  <Text as="span" color="var(--text-muted)">
                    {session.startTime}
                  </Text>
                  <Text as="span">{session.title}</Text>
                </Flex>
              </Link>
            </Box>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
