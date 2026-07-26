import { createFileRoute } from "@tanstack/react-router";

import { SimpleMenuPage } from "~/components/SimpleMenuPage";

export const Route = createFileRoute("/informasi-kehamilan/tanda-bahaya")({
  component: TandaBahayaKehamilanPage,
});

function TandaBahayaKehamilanPage() {
  return <SimpleMenuPage title="Tanda Bahaya Kehamilan" />;
}
