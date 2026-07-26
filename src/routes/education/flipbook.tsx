import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/education/flipbook")({
  component: EducationFlipbookLayout,
});

function EducationFlipbookLayout() {
  return <Outlet />;
}
