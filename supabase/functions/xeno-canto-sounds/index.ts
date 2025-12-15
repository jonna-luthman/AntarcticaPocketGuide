import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("Success", { headers: corsHeaders });
  }

  const apiKey = Deno.env.get("XENO_CANTO_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Missing Xeno-canto API key" }),
      { status: 500, headers: corsHeaders }
    );
  }

  let scientificName: string | null = null;

  try {
    const body = await req.json();
    scientificName = body?.name ?? null;
  } catch {
    scientificName = null;
  }

  if (!scientificName) {
    return new Response(JSON.stringify({ error: "Missing scientific name" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  const query = `sp:"${scientificName}"`;
  const apiUrl = `https://xeno-canto.org/api/3/recordings?query=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  const res = await fetch(apiUrl, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch from Xeno-canto" }),
      { status: res.status, headers: corsHeaders }
    );
  }

  const data = await res.json();

  const recordings = (data.recordings ?? []).slice(0, 1).map((r: any) => ({
    id: r.id,
    file: r.file.startsWith("http") ? r.file : `https:${r.file}`,
    recorder: r.rec,
    country: r.cnt,
    license: r.lic,
  }));

  return new Response(JSON.stringify(recordings), {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
});
