'use client'

import React, {SyntheticEvent, useState} from "react";
import Cabecalho from "@/components/Cabecalho";
import { fraunces, instrumentSans } from "@/util/Fonts";
import Slogan from "@/components/Slogan";
import Link from "next/link";
import {initialProduct, ProductForm} from "@/util/Produto";
import FormProduto from "@/components/FormProduto";

const TelaAdicaoProduto = () => {
    const [product, setProduct] = useState<ProductForm>(initialProduct);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;

        setProduct((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };

    const handleSubmit = (event: SyntheticEvent): void => {
        event.preventDefault();
    };

    return (
        <div className="flex flex-col min-h-screen relative bg-[#f7f9f6]">
            <Cabecalho onClickUrl="/navegacao" onClickScreen="à Tela Principal" ehInicio={false} />

            <main className="flex-1 flex flex-col items-center justify-center py-6 px-4 w-full">
                <div className="flex flex-col w-160 max-w-full items-center justify-center relative flex-[0_0_auto]">
                    <form
                        className={`${instrumentSans.className} flex flex-col w-145 max-w-[calc(100vw-2rem)] items-start gap-7 p-10 relative flex-[0_0_auto] bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710]`}
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <h1 className={`${fraunces.className} relative self-stretch -mt-px font-bold text-[#1e291f] text-[32px] text-center tracking-normal leading-[normal]`}>
                                Adicionar Produto
                            </h1>
                            <p className={`${instrumentSans.className} relative self-stretch font-normal text-[#556858] text-[15px] text-center tracking-normal leading-[22.5px]`}>
                                Cadastre um novo produto no seu estoque
                            </p>
                        </div>

                        <FormProduto handleChange={handleChange} product={product}></FormProduto>

                        <div className="flex flex-col items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
                            <Link
                                className="flex items-center justify-center px-0 py-3.5 relative self-stretch w-full bg-[#2d5a27] rounded-[10px] cursor-pointer hover:bg-[#23491f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                                href="/estoque"
                            >
                                <span className="relative w-fit -mt-px font-semibold text-white text-base tracking-normal leading-[normal]">
                                    Adicionar ao Estoque
                                </span>
                            </Link>
                            <Link
                                className="flex items-center justify-center px-0 py-3 relative self-stretch w-full rounded-[10px] border border-solid border-[#2d5a27] cursor-pointer hover:bg-[#f1f6f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                                href="/estoque"
                            >
                                <span className="relative w-fit -mt-px font-semibold text-[#2d5a27] text-base tracking-normal leading-[normal]">
                                    Cancelar
                                </span>
                            </Link>
                            <Slogan />
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default TelaAdicaoProduto;