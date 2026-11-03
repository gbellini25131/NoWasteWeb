'use client'

import React, { useEffect, useState } from "react";
import Cabecalho from "@/components/Cabecalho";
import {fraunces, instrumentSans} from "@/util/Fonts";
import Slogan from "@/components/Slogan";
import {initialProduct, ProductForm} from "@/util/Produto";
import FormProduto from "@/components/FormProduto";
import { useRouter } from "next/navigation";
import { backend, buscarOuCriarCategoria, CategoriaApi, getSession, ProdutoApi } from "@/util/api";

const TelaEdicaoProduto = ()  => {
    const router = useRouter();
    const [product, setProduct] = useState<ProductForm>(initialProduct);
    const [productId, setProductId] = useState<number | null>(null);
    const [categorias, setCategorias] = useState<CategoriaApi[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        Promise.resolve().then(() => {
        const id = Number(new URLSearchParams(window.location.search).get("id"));
        if (!Number.isSafeInteger(id) || id <= 0) {
            setError("Nenhum produto foi selecionado para edição.");
            setLoading(false);
            return;
        }
        setProductId(id);
        Promise.all([backend<ProdutoApi[]>("produtos"), backend<CategoriaApi[]>("categorias")])
            .then(([produtos, lista]) => {
                const escolhido = produtos.find((p) => p.idProduto === id);
                if (!escolhido) throw new Error("Produto não encontrado no seu estoque.");
                setCategorias(lista);
                setProduct({ name: escolhido.nome,
                    category: lista.find((c) => c.idCategoria === escolhido.idCategoria)?.nome || "",
                    quantity: String(escolhido.quantidade),
                    expirationDate: escolhido.dataValidade.slice(0, 10) });
            }).catch((e: Error) => setError(e.message))
            .finally(() => setLoading(false));
        });
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setProduct((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!productId) return;
        setSaving(true); setError("");
        try {
            const quantidade = Number(product.quantity);
            if (!Number.isSafeInteger(quantidade) || quantidade <= 0) throw new Error("Informe uma quantidade inteira maior que zero.");
            const categoria = await buscarOuCriarCategoria(product.category);
            await backend(`produtos/${productId}`, { method: "PUT", body: JSON.stringify({
                idProduto: productId, nome: product.name.trim(), idCategoria: categoria.idCategoria,
                idUsuario: getSession().userId, quantidade, dataValidade: product.expirationDate,
            }) });
            router.push("/estoque");
        } catch (e) { setError(e instanceof Error ? e.message : "Erro ao salvar produto."); }
        finally { setSaving(false); }
    };

    const excluir = async () => {
        if (!productId || !window.confirm(`Deseja excluir ${product.name} do estoque?`)) return;
        setSaving(true); setError("");
        try {
            await backend(`produtos/${productId}`, { method: "DELETE" });
            router.push("/estoque");
        } catch (e) { setError(e instanceof Error ? e.message : "Erro ao excluir produto."); }
        finally { setSaving(false); }
    };

    return (
        <main className="flex min-h-screen flex-col items-center relative bg-[#f7f9f6]">
            <Cabecalho onClickUrl="/navegacao" onClickScreen="à Tela Principal" ehInicio={false} />
            <section className="flex flex-col h-219.75 items-center justify-center pt-5 pb-15 px-0 relative self-stretch w-full max-sm:h-auto max-sm:min-h-219.75">
                <div className="flex flex-col w-160 items-center justify-center relative flex-[0_0_auto] max-sm:w-full max-sm:px-4">
                    <form
                        onSubmit={handleSubmit}
                        className={`${instrumentSans.className} flex flex-col w-145 items-start gap-7 p-10 relative flex-[0_0_auto] bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710] max-sm:w-full max-sm:p-6`}
                    >
                        <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <h1 className={`${fraunces.className} relative self-stretch -mt-px font-bold text-[#1e291f] text-[32px] text-center tracking-normal leading-[normal]`}>
                                Editar Produto
                            </h1>
                            <p className={`${instrumentSans.className} relative self-stretch font-normal text-[#556858] text-[15px] text-center tracking-normal leading-[22.5px]`}>
                                Atualize as informações do seu produto
                            </p>
                        </div>

                        {loading ? <p>Carregando produto...</p> : <FormProduto handleChange={handleChange} product={product} categorias={categorias.map((c) => c.nome)} />}
                        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}

                        <div className="flex flex-col items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
                            <button
                                type="submit"
                                disabled={loading || saving || !productId}
                                className="flex items-center justify-center px-0 py-3.5 relative self-stretch w-full flex-[0_0_auto] bg-[#2d5a27] rounded-[10px] hover:bg-[#23491f] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]"
                            >
                                <span className="relative w-fit -mt-px font-semibold text-white text-base tracking-normal leading-[normal]">
                                    {saving ? "Salvando..." : "Salvar Alterações"}
                                </span>
                            </button>
                            <button
                                type="button"
                                disabled={loading || saving || !productId}
                                onClick={excluir}
                                className="flex items-center justify-center px-0 py-3.25 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] border border-solid border-[#d32f2f] hover:bg-[#fff5f5] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#d32f2f]"
                            >
                                <span className="relative w-fit -mt-px font-semibold text-[#d32f2f] text-base tracking-normal leading-[normal]">
                                    Excluir Produto
                                </span>
                            </button>
                            <Slogan />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default TelaEdicaoProduto
