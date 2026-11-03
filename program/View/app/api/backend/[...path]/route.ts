import { apiMvcBase, jsonErro } from "@/util/serverApi";

type Context = { params: Promise<{ path: string[] }> };

/** Impede que esta rota seja usada como proxy arbitrário. */
function permitido(path: string[], method: string): boolean {
    const [recurso, id, extra] = path;
    if (extra || !["usuarios", "produtos", "categorias"].includes(recurso)) return false;
    if (recurso === "usuarios") {
        if (id === "login") return method === "POST";
        if (!id) return method === "POST";
        return /^\d+$/.test(id) && ["GET", "PUT"].includes(method);
    }
    if (!id) return ["GET", "POST"].includes(method);
    return /^\d+$/.test(id) && ["GET", "PUT", "DELETE"].includes(method);
}

async function encaminhar(request: Request, context: Context): Promise<Response> {
    const { path } = await context.params;
    if (!permitido(path, request.method)) return jsonErro("Endpoint não permitido.", 404);

    const headers: Record<string, string> = { Accept: "application/json" };
    const authorization = request.headers.get("authorization");
    if (authorization) headers.Authorization = authorization;
    if (request.method !== "GET") headers["Content-Type"] = "application/json";

    try {
        const resposta = await fetch(`${apiMvcBase}/${path.join("/")}`, {
            method: request.method,
            headers,
            body: request.method === "GET" ? undefined : await request.text(),
            cache: "no-store",
            signal: AbortSignal.timeout(10000),
        });
        return new Response(await resposta.text(), {
            status: resposta.status,
            headers: {
                "Content-Type": resposta.headers.get("content-type") || "application/json",
                "Cache-Control": "no-store",
            },
        });
    } catch {
        return jsonErro("A API MVC não está acessível. Confira API_BASE_URL e o servidor .NET.", 502);
    }
}

export const GET = encaminhar;
export const POST = encaminhar;
export const PUT = encaminhar;
export const DELETE = encaminhar;
