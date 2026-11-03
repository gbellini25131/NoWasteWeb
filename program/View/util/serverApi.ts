/** Comunicação restrita ao servidor Next.js com a API MVC. */
export const apiMvcBase = (process.env.API_BASE_URL || "http://localhost:5020").replace(/\/$/, "");

export function authHeader(request: Request): string | null {
    const value = request.headers.get("authorization");
    return value?.startsWith("Bearer ") && value.length > 12 ? value : null;
}

export async function carregarEstoque(authorization: string): Promise<Response> {
    return fetch(`${apiMvcBase}/produtos`, {
        headers: { Authorization: authorization, Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
    });
}

export function jsonErro(message: string, status: number): Response {
    return Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}
