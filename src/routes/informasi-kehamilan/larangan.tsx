import { createFileRoute } from "@tanstack/react-router";

import { SimpleMenuPage } from "~/components/SimpleMenuPage";

export const Route = createFileRoute("/informasi-kehamilan/larangan")({
  component: LaranganKehamilanPage,
});

function LaranganKehamilanPage() {
  return <SimpleMenuPage title="Larangan Saat Hamil" />;
}
