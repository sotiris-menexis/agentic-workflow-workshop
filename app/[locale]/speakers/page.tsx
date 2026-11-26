import { PageHeading } from "@/components/atoms/page-heading";
import { Flex } from "@chakra-ui/react";
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

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title={t("title")}>{t("intro")}</PageHeading>
    </Flex>
  );
}
