import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/education/video")({
  component: EducationVideoLayout,
});

function EducationVideoLayout() {
  return <Outlet />;
}
