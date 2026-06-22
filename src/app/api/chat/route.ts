export async function POST() {
  return Response.json(
    { message: "Chat service is not configured yet." },
    { status: 501 },
  );
}
