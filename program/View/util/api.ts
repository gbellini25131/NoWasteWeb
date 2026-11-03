export type ProdutoApi = {
    idProduto: number;
    nome: string;
    idCategoria: number;
    idUsuario: number;
    quantidade: number;
    dataValidade: string;
};

export type CategoriaApi = { idCategoria: number; nome: string };

export type ReceitaResumo = {
    id: number;
    title: string;
    image: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
    usedIngredients: { name: string }[];
    missedIngredients: { name: string }[];
};

export type ReceitaDetalhe = {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number | null;
    servings: number | null;
    ingredients: string[];
    steps: string[];
    sourceUrl: string | null;
};

export function getSession(): { token: string; userId: number } {
    const token = localStorage.getItem("authToken");
    const userId = Number(localStorage.getItem("userId"));
    if (!token || !Number.isSafeInteger(userId) || userId <= 0) {
        throw new Error("Sua sessão não foi encontrada. Faça login para continuar.");
    }
    return { token, userId };
}

export async function requestJson<T>(path: string, init: RequestInit = {}, requireAuth = true): Promise<T> {
    const headers = new Headers(init.headers);
    if (requireAuth) headers.set("Authorization", `Bearer ${getSession().token}`);
    if (init.body) headers.set("Content-Type", "application/json");

    let response: Response;
    try {
        response = await fetch(path, { ...init, headers, cache: "no-store" });
    } catch {
        throw new Error("Não foi possível conectar ao servidor. Confira se a API está em execução.");
    }
    const body = await response.text();
    let data: unknown = null;
    if (body) {
        try { data = JSON.parse(body); } catch { data = body; }
    }
    if (!response.ok) {
        if (response.status === 401) throw new Error(requireAuth ? "Sua sessão expirou. Faça login novamente." : "Email ou senha incorretos.");
        const message = typeof data === "string" ? data :
            data && typeof data === "object" && "message" in data ? String(data.message) :
            data && typeof data === "object" && "mensagem" in data ? String(data.mensagem) :
            `A solicitação falhou (HTTP ${response.status}).`;
        throw new Error(message);
    }
    return data as T;
}

export const backend = <T>(endpoint: string, init?: RequestInit, requireAuth = true) =>
    requestJson<T>(`/api/backend/${endpoint}`, init, requireAuth);

export async function buscarOuCriarCategoria(nome: string): Promise<CategoriaApi> {
    const categorias = await backend<CategoriaApi[]>("categorias");
    const existente = categorias.find((c) => c.nome.trim().toLocaleLowerCase("pt-BR") === nome.trim().toLocaleLowerCase("pt-BR"));
    if (existente) return existente;
    return backend<CategoriaApi>("categorias", {
        method: "POST",
        body: JSON.stringify({ nome: nome.trim() }),
    });
}

export function formatarData(iso: string): string {
    const [ano, mes, dia] = iso.substring(0, 10).split("-");
    return ano && mes && dia ? `${dia}/${mes}/${ano}` : iso;
}
