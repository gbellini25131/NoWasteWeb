import { authHeader, carregarEstoque, jsonErro } from "@/util/serverApi";
import { spoonacularGet, textoSemHtml } from "@/util/spoonacular";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: Context): Promise<Response> {
    const authorization = authHeader(request);
    if (!authorization) return jsonErro("Faça login para visualizar a receita.", 401);
    const { id } = await context.params;
    if (!/^\d+$/.test(id)) return jsonErro("Receita inválida.", 400);

    try {
        const estoqueResponse = await carregarEstoque(authorization);
        if (!estoqueResponse.ok) return jsonErro("Sessão inválida ou API indisponível.", estoqueResponse.status);

        const resposta = await spoonacularGet(`/recipes/${id}/information`,
            new URLSearchParams({ includeNutrition: "false" }));
        if (!resposta.ok) return jsonErro("Não foi possível carregar os detalhes desta receita no Spoonacular.", 502);
        const r = await resposta.json();
        const steps: string[] = Array.isArray(r.analyzedInstructions) ?
            r.analyzedInstructions.flatMap((grupo: { steps?: { step: string }[] }) =>
                (grupo.steps || []).map((passo) => textoSemHtml(passo.step))) : [];
        if (!steps.length && r.instructions) steps.push(textoSemHtml(r.instructions));
        return Response.json({
            id: r.id, title: r.title, image: r.image || "",
            readyInMinutes: r.readyInMinutes ?? null, servings: r.servings ?? null,
            ingredients: (r.extendedIngredients || []).map((i: { original?: string; name?: string }) => i.original || i.name || ""),
            steps, sourceUrl: /^https:\/\//.test(r.sourceUrl || "") ? r.sourceUrl : null,
        }, { headers: { "Cache-Control": "no-store" } });
    } catch (erro) {
        return jsonErro(erro instanceof Error && erro.message.includes("SPOONACULAR_API_KEY") ? erro.message :
            "Não foi possível consultar os detalhes da receita.", 503);
    }
}
