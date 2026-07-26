import { createFileRoute } from "@tanstack/react-router";

import { SimpleMenuPage } from "~/components/SimpleMenuPage";

export const Route = createFileRoute("/informasi-kehamilan/masalah")({
  component: MasalahKehamilanPage,
});

function MasalahKehamilanPage() {
  return <SimpleMenuPage title="Masalah Kehamilan" />;
}
