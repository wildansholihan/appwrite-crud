import EditPageClient from "@/components/EditPageClient";

export default function EditPage({ params }: { params: { id: string } }) {
  return <EditPageClient id={params.id} />;
}