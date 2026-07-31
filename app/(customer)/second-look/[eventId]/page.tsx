import { redirect } from "next/navigation";

export default async function SecondLookPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const resolvedParams = await params;
  const eventId = resolvedParams.eventId;
  redirect(`/mock/product/prod_1?eventId=${eventId}`);
}
