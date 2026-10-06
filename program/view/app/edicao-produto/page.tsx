'use client'

import React, { useState } from "react";
import Link from "next/link";
import Cabecalho from "@/components/Cabecalho";
import {fraunces, instrumentSans} from "@/util/Fonts";
import Slogan from "@/components/Slogan";
import {initialProduct, ProductForm} from "@/util/Produto";
import FormProduto from "@/components/FormProduto";

const TelaEdicaoProduto = ()  => {
    const [product, setProduct] = useState<ProductForm>(initialProduct);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setProduct((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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

                        <FormProduto handleChange={handleChange} product={product}></FormProduto>

                        <div className="flex flex-col items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
                            <Link
                                href="/estoque"
                                className="flex items-center justify-center px-0 py-3.5 relative self-stretch w-full flex-[0_0_auto] bg-[#2d5a27] rounded-[10px] hover:bg-[#23491f] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]"
                            >
                                <span className="relative w-fit -mt-px font-semibold text-white text-base tracking-normal leading-[normal]">
                                    Salvar Alterações
                                </span>
                            </Link>
                            <Link
                                href="/estoque"
                                className="flex items-center justify-center px-0 py-3.25 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] border border-solid border-[#d32f2f] hover:bg-[#fff5f5] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#d32f2f]"
                            >
                                <span className="relative w-fit -mt-px font-semibold text-[#d32f2f] text-base tracking-normal leading-[normal]">
                                    Excluir Produto
                                </span>
                            </Link>
                            <Slogan />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default TelaEdicaoProduto