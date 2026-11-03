const spoonacularBase = "https://api.spoonacular.com";

export async function spoonacularGet(path: string, params?: URLSearchParams): Promise<Response> {
    const key = process.env.SPOONACULAR_API_KEY;
    if (!key) throw new Error("SPOONACULAR_API_KEY não foi configurada no servidor Next.js.");
    const url = new URL(`${spoonacularBase}${path}`);
    if (params) url.search = params.toString();
    return fetch(url, {
        headers: { "x-api-key": key, Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
    });
}

/** Equivalências usuais para a busca em inglês. Termos desconhecidos são preservados. */
const nomesEmIngles: Record<string, string> = {
    "leite": "milk", "queijo": "cheese", "mussarela": "mozzarella",
    "iogurte": "yogurt", "manteiga": "butter", "frango": "chicken",
    "carne": "beef", "ovo": "egg", "ovos": "eggs",
    "tomate": "tomato", "batata": "potato", "cenoura": "carrot",
    "cebola": "onion", "alho": "garlic", "arroz": "rice",
    "feijao": "beans", "macarrao": "pasta", "massa": "pasta",
    "abobrinha": "zucchini", "berinjela": "eggplant", "milho": "corn",
    "banana": "banana", "maca": "apple", "limao": "lemon",
    "alface": "lettuce", "brocolis": "broccoli", "peixe": "fish",
    "atum": "tuna", "pao": "bread", "farinha": "flour",
    "acucar": "sugar", "azeite": "olive oil", "oleo": "oil",
    "morango": "strawberry", "creme de leite": "cream",
};

export function nomeParaBusca(nome: string): string {
    const normalizado = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const chaves = Object.keys(nomesEmIngles).sort((a, b) => b.length - a.length);
    const correspondente = chaves.find((chave) => new RegExp(`\\b${chave}\\b`).test(normalizado));
    return correspondente ? nomesEmIngles[correspondente] : nome.trim();
}

export function textoSemHtml(texto: string): string {
    return texto.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}
