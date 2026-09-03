import StatusPage from "@/components/global-components/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      eyebrow="404"
      title="Page not found"
      description="The page you're looking for doesn't exist or may have moved."
    />
  );
}
