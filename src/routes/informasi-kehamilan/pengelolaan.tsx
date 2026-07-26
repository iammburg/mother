import { createFileRoute } from "@tanstack/react-router";

import { SimpleMenuPage } from "~/components/SimpleMenuPage";

export const Route = createFileRoute("/informasi-kehamilan/pengelolaan")({
  component: PengelolaanKehamilanPage,
});

function PengelolaanKehamilanPage() {
  return <SimpleMenuPage title="Pengelolaan Kehamilan" />;
}
