import StatusPage from "@/components/global-components/StatusPage";

export default function NotFoundPage() {
  return (
    <StatusPage
      eyebrow="404"
      title="Not found"
      description="That page doesn't exist, or you don't have access to it."
    />
  );
}
