'use client'

import { useEffect, useState } from "react";
import {Apple, Beef, Milk, Plus, Trash2, Utensils } from "lucide-react";
import {fraunces, instrumentSans} from "@/util/Fonts";
import Slogan from "@/components/Slogan";
import Link from "next/link";
import { backend, CategoriaApi, formatarData, ProdutoApi } from "@/util/api";

const PainelDeInventario = () => {
    const [inventory, setInventory] = useState<ProdutoApi[]>([]);
    const [categorias, setCategorias] = useState<CategoriaApi[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        Promise.all([backend<ProdutoApi[]>("produtos"), backend<CategoriaApi[]>("categorias")])
            .then(([produtos, lista]) => { setInventory(produtos); setCategorias(lista); })
            .catch((e: Error) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const removeProduct = async (id: number, nome: string) => {
        if (!window.confirm(`Excluir ${nome} do estoque?`)) return;
        setError("");
        try {
            await backend(`produtos/${id}`, { method: "DELETE" });
            setInventory((items) => items.filter((item) => item.idProduto !== id));
        } catch (e) { setError(e instanceof Error ? e.message : "Não foi possível excluir o produto."); }
    };

    const hoje = new Date().toLocaleDateString("sv-SE");

    return (
        <>
            <section className="flex flex-col items-center justify-center pt-10 pb-15 px-0 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col w-280 max-w-full items-center justify-center relative flex-[0_0_auto]">
                    <div className={`${instrumentSans.className} flex flex-col items-start gap-10 p-12 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710]`}>
                        <header className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex flex-col items-start gap-2 relative flex-1 grow">
                                <h1 className={`${fraunces.className} relative self-stretch -mt-px  font-bold text-[#1e291f] text-4xl tracking-normal leading-[normal]`}>
                                    Meu Estoque
                                </h1>
                                <p className="font-normal text-[#556858] text-base">
                                    Gerencie seus produtos e fique de olho nas validades
                                </p>
                            </div>
                            <Link
                                href="/adicao-produto"
                                className="inline-flex items-center gap-2 px-5 py-3 relative flex-[0_0_auto] bg-[#2d5a27] rounded-lg hover:bg-[#23491f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                                aria-label="Adicionar novo produto"
                            >
                                <Plus className="w-4 h-4 text-white" aria-hidden="true" />
                                <span className={`${instrumentSans.className} font-semibold text-white text-[15px] whitespace-nowrap`}>
                                  Adicionar Produto
                                </span>
                            </Link>
                        </header>

                        <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            {error && <p role="alert" className="text-red-700">{error}</p>}
                            {loading && <p className="text-[#556858]">Carregando seu estoque...</p>}
                            {!loading && !error && inventory.length === 0 && <p className="text-[#556858]">Seu estoque está vazio. Adicione seu primeiro produto.</p>}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6 relative self-stretch w-full">
                                {inventory.map((item) => {
                                    const categoria = categorias.find((c) => c.idCategoria === item.idCategoria)?.nome || "Sem categoria";
                                    const ItemIcon = /leite|latic|iogurte/i.test(categoria) ? Milk :
                                        /carne|frango|peixe/i.test(categoria) ? Beef :
                                        /horti|fruta|legume/i.test(categoria) ? Apple : Utensils;
                                    const validade = item.dataValidade.slice(0, 10);
                                    const diasRestantes = Math.ceil((new Date(`${validade}T00:00:00`).getTime() - new Date(`${hoje}T00:00:00`).getTime()) / 86400000);
                                    const status = diasRestantes < 0 ? "Vencido" : diasRestantes <= 7 ? "Vence em breve" : "Dentro da validade";
                                    return (
                                        <article
                                            key={item.idProduto}
                                            className={`${instrumentSans.className} gap-5 p-6 flex-1 grow bg-white rounded-2xl border border-solid border-[#dce3dd] flex flex-col items-start relative min-w-0`}
                                        >
                                            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                                                <div
                                                    className="flex w-12 h-12 items-center justify-center rounded-3xl bg-[#e8efe9]"
                                                >
                                                    <ItemIcon className="w-6 h-6 text-[#1e291f]" aria-hidden="true" />
                                                </div>
                                                <span
                                                    className={`inline-flex items-start px-3 py-1.5 relative flex-[0_0_auto] rounded-[20px] font-semibold text-xs ${
                                                        status === "Vence em breve" || status === "Vencido"
                                                            ? "bg-[#fff3e0] text-[#e65100]"
                                                            : "bg-[#e8efe9] text-[#2d5a27]"
                                                    }`}
                                                >
                                                  {status}
                                                </span>
                                            </div>

                                            <div className="gap-1.5 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative">
                                                <h2 className={`${fraunces.className} font-bold text-[#1e291f] text-lg`}>
                                                    <Link href={`/edicao-produto?id=${item.idProduto}`} className="hover:underline">{item.nome}</Link>
                                                </h2>
                                                <p className="font-normal text-[#556858] text-sm">
                                                    Validade:{" "}
                                                    <time
                                                        className={`font-semibold ${
                                                            status !== "Dentro da validade"
                                                                ? "text-[#e65100]"
                                                                : "text-[#1e291f]"
                                                        }`}
                                                    >
                                                        {formatarData(item.dataValidade)}
                                                    </time>
                                                </p>
                                                <p className="text-sm text-[#556858]">Quantidade: {item.quantidade}</p>
                                            </div>

                                            <div className="w-full h-px bg-[#dce3dd]" />

                                            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                                                <span className="font-normal text-[#556858] text-[13px]">
                                                  {categoria}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeProduct(item.idProduto, item.nome)}
                                                    className="inline-flex items-center gap-1 relative flex-[0_0_auto] text-[#d32f2f] hover:text-[#a92323] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d32f2f] focus-visible:ring-offset-2 rounded"
                                                    aria-label={`Excluir ${item.nome}`}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                                                    <span className="font-semibold text-sm">
                                                        Excluir
                                                    </span>
                                                </button>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        <footer className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="w-full h-px bg-[#dce3dd]" />
                            <Slogan />
                        </footer>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PainelDeInventario;
