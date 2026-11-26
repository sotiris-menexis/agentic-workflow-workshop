import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { getSpeakersFromSessions } from "@/utils/speakers";
import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function SpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Keeps the page static: without it next-intl reads the locale from the request.
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "SpeakersPage" });

  const speakers = getSpeakersFromSessions(await fetchSessions());

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title={t("title")}>{t("intro")}</PageHeading>

      {speakers.length === 0 ? (
        <Text color="var(--text-muted)">{t("empty")}</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.name} speaker={speaker} />
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
}
