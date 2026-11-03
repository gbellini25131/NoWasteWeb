'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoaderCircle, Timer } from "lucide-react";
import { fraunces, instrumentSans } from "@/util/Fonts";
import Cabecalho from "@/components/Cabecalho";
import Slogan from "@/components/Slogan";
import { ReceitaDetalhe, ReceitaResumo, requestJson } from "@/util/api";

function FotoReceita({ src, titulo, grande = false }: { src: string; titulo: string; grande?: boolean }) {
    return <div className={`relative overflow-hidden bg-[#e8efe9] ${grande ? "h-56 rounded-xl" : "h-45"}`}>
        {src ? <Image src={src} alt={titulo} fill unoptimized sizes="(max-width: 768px) 100vw, 400px" className="object-cover" /> :
            <div className="h-full flex items-center justify-center text-[#556858]">Imagem indisponível</div>}
    </div>;
}

function ReceitaCard({ recipe, onOpen }: { recipe: ReceitaResumo; onOpen: () => void }) {
    return <article className={`${instrumentSans.className} flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-[#dce3dd] min-w-0`}>
        <div>
            <FotoReceita src={recipe.image} titulo={recipe.title} />
            <div className="p-5 flex flex-col gap-3">
                <h2 className={`${fraunces.className} font-bold text-[#1e291f] text-xl`}>{recipe.title}</h2>
                <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-[#e8efe9] text-[#2d5a27] rounded-md p-2 font-semibold">{recipe.usedIngredientCount} ingredientes do estoque</span>
                    <span className="bg-[#fff3e0] text-[#e65100] rounded-md p-2 font-semibold">{recipe.missedIngredientCount} ingredientes faltantes</span>
                </div>
                {recipe.missedIngredients.length > 0 && <p className="text-sm text-[#556858]">Faltam: {recipe.missedIngredients.map((i) => i.name).join(", ")}</p>}
            </div>
        </div>
        <div className="px-5 pb-5">
            <button onClick={onOpen} type="button" className="w-full h-11 rounded-xl border border-[#2d5a27] font-semibold text-[#2d5a27] hover:bg-[#2d5a27] hover:text-white">Ver Receita</button>
        </div>
    </article>;
}

function DetalhesReceita({ resumo, onClose }: { resumo: ReceitaResumo; onClose: () => void }) {
    const [detalhe, setDetalhe] = useState<ReceitaDetalhe | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        let ativo = true;
        requestJson<ReceitaDetalhe>(`/api/receitas/${resumo.id}`)
            .then((r) => { if (ativo) setDetalhe(r); })
            .catch((e: Error) => { if (ativo) setError(e.message); });
        return () => { ativo = false; };
    }, [resumo.id]);

    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e291f]/50 p-3 sm:p-6" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className={`${instrumentSans.className} w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-xl`} role="dialog" aria-modal="true" aria-labelledby="recipe-dialog-title">
            <div className="flex justify-between gap-4 items-start">
                <div>
                    <p className="text-sm text-[#556858]">Receita do Spoonacular</p>
                    <h2 id="recipe-dialog-title" className={`${fraunces.className} mt-2 text-2xl sm:text-3xl font-bold text-[#1e291f]`}>{resumo.title}</h2>
                </div>
                <button type="button" aria-label="Fechar receita" className="text-2xl rounded-md px-2 hover:bg-[#f7f9f6]" onClick={onClose}>×</button>
            </div>
            <div className="mt-5"><FotoReceita src={resumo.image} titulo={resumo.title} grande /></div>
            {!detalhe && !error && <p className="mt-6 flex items-center gap-2 text-[#556858]"><LoaderCircle className="animate-spin w-5 h-5" /> Carregando preparo e ingredientes...</p>}
            {error && <p role="alert" className="mt-6 text-red-700">{error}</p>}
            {detalhe && <>
                <div className="mt-5 flex gap-3 text-sm text-[#556858]">
                    {detalhe.readyInMinutes !== null && <span className="flex items-center gap-1 bg-[#f7f9f6] rounded-md p-2"><Timer className="w-4 h-4" /> {detalhe.readyInMinutes} min</span>}
                    {detalhe.servings !== null && <span className="bg-[#f7f9f6] rounded-md p-2">{detalhe.servings} porções</span>}
                </div>
                <h3 className={`${fraunces.className} mt-6 mb-2 text-xl font-bold text-[#1e291f]`}>Ingredientes</h3>
                <ul className="list-disc pl-6 space-y-1 text-[#556858]">{detalhe.ingredients.map((item, i) => <li key={i}>{item}</li>)}</ul>
                <h3 className={`${fraunces.className} mt-6 mb-2 text-xl font-bold text-[#1e291f]`}>Modo de preparo</h3>
                {detalhe.steps.length ? <ol className="list-decimal pl-6 space-y-2 text-[#556858]">{detalhe.steps.map((step, i) => <li key={i}>{step}</li>)}</ol> :
                    <p className="text-[#556858]">O fornecedor não disponibilizou instruções de preparo.</p>}
                {detalhe.sourceUrl && <a href={detalhe.sourceUrl} target="_blank" rel="noopener noreferrer" className="block mt-5 text-[#2d5a27] underline">Ver receita original</a>}
            </>}
            <button className="mt-8 w-full rounded-lg bg-[#2d5a27] px-6 py-3 text-white font-semibold" type="button" onClick={onClose}>Fechar</button>
        </div>
    </div>;
}

export default function TelaReceitas() {
    const [recipes, setRecipes] = useState<ReceitaResumo[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<ReceitaResumo | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ativo = true;
        const quantidade = new URLSearchParams(window.location.search).get("quantidade") || "3";
        requestJson<ReceitaResumo[]>(`/api/receitas/sugestoes?quantidade=${encodeURIComponent(quantidade)}`)
            .then((lista) => { if (ativo) setRecipes(lista); })
            .catch((e: Error) => { if (ativo) setError(e.message); })
            .finally(() => { if (ativo) setLoading(false); });
        return () => { ativo = false; };
    }, []);

    return <main className="flex min-h-screen flex-col bg-[#f7f9f6]">
        <Cabecalho onClickUrl="/navegacao" onClickScreen="à Tela Principal" ehInicio={false} />
        <section className="flex flex-1 items-center justify-center py-10 px-4">
            <div className="w-full max-w-6xl bg-white p-6 sm:p-12 rounded-3xl shadow-[0px_16px_32px_#2d5a2710] flex flex-col gap-10">
                <header>
                    <h1 className={`${fraunces.className} font-bold text-[#1e291f] text-4xl`}>Receitas Sugeridas</h1>
                    <p className={`${instrumentSans.className} mt-2 text-[#556858]`}>Sugestões encontradas com os ingredientes disponíveis no seu estoque. Os títulos e preparos podem estar em inglês.</p>
                </header>
                {loading && <p className="flex items-center gap-2 text-[#556858]"><LoaderCircle className="w-5 h-5 animate-spin" /> Consultando estoque e Spoonacular...</p>}
                {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}
                {!loading && !error && recipes.length === 0 && <p className="text-[#556858]">Não encontramos receitas para esses ingredientes. Tente cadastrar outros produtos.</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => <ReceitaCard key={recipe.id} recipe={recipe} onOpen={() => setSelectedRecipe(recipe)} />)}
                </div>
                <footer className="flex flex-col items-center gap-6">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/sugestao-receitas" className="px-4 py-3 rounded-xl border border-[#2d5a27] text-[#2d5a27] hover:bg-[#e8efe9]">Gerar novas receitas</Link>
                        <Link href="/estoque" className="px-4 py-3 rounded-xl border border-[#2d5a27] text-[#2d5a27] hover:bg-[#e8efe9]">Voltar ao estoque</Link>
                    </div>
                    <Slogan />
                </footer>
            </div>
        </section>
        {selectedRecipe && <DetalhesReceita resumo={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
    </main>;
}
