import type { AnalyzeRequest, AnalyzeResponse } from "../types";

const DEFAULT_BASE_URL = "http://127.0.0.1:8000";

export async function analyze(request: AnalyzeRequest, baseUrl: string = DEFAULT_BASE_URL): Promise<AnalyzeResponse> {
  const res = await fetch(`${baseUrl}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Analyze request failed (${res.status}): ${text || res.statusText}`);
  }

  return (await res.json()) as AnalyzeResponse;
}
