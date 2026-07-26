import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/education")({
  component: EducationLayout,
});

function EducationLayout() {
  return <Outlet />;
}
