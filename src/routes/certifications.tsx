import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/certifications")({
  component: CertificationsPage,
});

function CertificationsPage() {
  return (
    <div>
      <h1>My Certifications</h1>
    </div>
  );
}