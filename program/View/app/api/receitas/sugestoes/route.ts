import { authHeader, carregarEstoque, jsonErro } from "@/util/serverApi";
import { nomeParaBusca, spoonacularGet } from "@/util/spoonacular";
import type { ProdutoApi, ReceitaResumo } from "@/util/api";

export async function GET(request: Request): Promise<Response> {
    const authorization = authHeader(request);
    if (!authorization) return jsonErro("Faça login para consultar receitas.", 401);

    const quantidade = Number(new URL(request.url).searchParams.get("quantidade") || "3");
    if (![1, 3, 5].includes(quantidade)) return jsonErro("Quantidade inválida.", 400);

    try {
        const estoqueResponse = await carregarEstoque(authorization);
        if (!estoqueResponse.ok) return jsonErro("Não foi possível consultar seu estoque.", estoqueResponse.status);
        const produtos = (await estoqueResponse.json()) as ProdutoApi[];
        const hoje = new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
        const ingredientes = [...new Set(produtos
            .filter((p) => p.quantidade > 0 && p.dataValidade.slice(0, 10) >= hoje)
            .map((p) => nomeParaBusca(p.nome))
            .filter(Boolean))];

        if (ingredientes.length === 0) return jsonErro("Cadastre produtos dentro da validade antes de gerar receitas.", 422);

        const busca = new URLSearchParams({
            ingredients: ingredientes.join(","), number: String(quantidade),
            ranking: "1", ignorePantry: "true",
        });
        const resposta = await spoonacularGet("/recipes/findByIngredients", busca);
        if (!resposta.ok) {
            if (resposta.status === 402 || resposta.status === 429) return jsonErro("Limite de consultas do Spoonacular atingido. Tente mais tarde.", 503);
            return jsonErro("O Spoonacular não conseguiu consultar as receitas.", 502);
        }

        const dados: ReceitaResumo[] = await resposta.json();
        if (!Array.isArray(dados)) return jsonErro("Resposta inesperada do Spoonacular.", 502);
        return Response.json(dados.map((r) => ({
            id: r.id, title: r.title, image: r.image,
            usedIngredientCount: r.usedIngredientCount,
            missedIngredientCount: r.missedIngredientCount,
            usedIngredients: r.usedIngredients || [],
            missedIngredients: r.missedIngredients || [],
        })), { headers: { "Cache-Control": "no-store" } });
    } catch (erro) {
        return jsonErro(erro instanceof Error && erro.message.includes("SPOONACULAR_API_KEY") ? erro.message :
            "Não foi possível obter as receitas. Verifique a conexão com as APIs.", 503);
    }
}
