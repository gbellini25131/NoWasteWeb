'use client'

import React, { JSX, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import image from "./image.svg";
import leafAccentIllustration from "./leaf-accent-illustration.png";
import vector from "./vector.svg";
import vector2 from "./vector-2.svg";
import vector4 from "./vector-4.svg";
import vector5 from "./vector-5.svg";
import vector6 from "./vector-6.svg";
import Cabecalho from "@/components/Cabecalho";
import Folha from "@/components/Folha";
import {Box, Calendar, House, LucideIcon, NotebookPen, Package, Tag} from "lucide-react";
import {fraunces, instrumentSans} from "@/util/Fonts";
import Slogan from "@/components/Slogan";

type ProductForm = {
    name: string;
    category: string;
    quantity: string;
    expirationDate: string;
    storageLocation: string;
    notes: string;
};

type Field = {
    id: keyof ProductForm;
    label: string;
    placeholder: string;
    icon: LucideIcon
    type?: string;
};

const fieldRows: Field[][] = [
    [
        {
            id: "name",
            label: "Nome do produto",
            placeholder: "Ex: Leite Integral",
            icon: Box,
        },
        {
            id: "category",
            label: "Categoria",
            placeholder: "Ex: Laticínios",
            icon: Tag,
        },
    ],
    [
        {
            id: "quantity",
            label: "Quantidade",
            placeholder: "Ex: 2 unidades",
            icon: Package,
        },
        {
            id: "expirationDate",
            label: "Data de validade",
            placeholder: "dd/mm/aaaa",
            icon: Calendar,
            type: "date",
        },
    ],
    [
        {
            id: "storageLocation",
            label: "Local de armazenamento",
            placeholder: "Ex: Geladeira",
            icon: House,
        },
        {
            id: "notes",
            label: "Observações",
            placeholder: "Ex: Comprado no mercado central",
            icon: NotebookPen,
        },
    ],
];

const initialProduct: ProductForm = {
    name: "",
    category: "",
    quantity: "",
    expirationDate: "",
    storageLocation: "",
    notes: "",
};

const TelaEdicaoProduto = (): JSX.Element => {
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
        <main className="flex min-h-256 flex-col items-center relative bg-[#f7f9f6]">
            <Cabecalho onClickUrl="/navegacao" onClickScreen="à Tela Principal" ehInicio={false} />
            <section className="flex flex-col h-219.75 items-center justify-center pt-5 pb-15 px-0 relative self-stretch w-full max-sm:h-auto max-sm:min-h-219.75">
                <div className="flex flex-col w-160 items-center justify-center relative flex-[0_0_auto] max-sm:w-full max-sm:px-4">
                    <Folha />
                    <div className="absolute left-[calc(50.00%-250px)] -bottom-10 w-125 h-20 bg-[#e8efe9] rounded-[250px/40px] blur-[20px] opacity-50 max-sm:left-[8%] max-sm:w-[84%]" />
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
                        <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                            {fieldRows.map((row, rowIndex) => (
                                <div
                                    key={`field-row-${rowIndex}`}
                                    className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto] max-sm:flex-col"
                                >
                                    {row.map((field) => {
                                        const Icon = field.icon
                                        return (
                                            <div
                                                className={`${instrumentSans.className} flex flex-col items-start gap-1.5 relative flex-1 grow max-sm:w-full`}
                                                key={field.id}
                                            >
                                                <label
                                                    className="relative self-stretch -mt-px font-semibold text-[#1e291f] text-sm tracking-normal leading-[normal]"
                                                    htmlFor={field.id}
                                                >
                                                    {field.label}
                                                </label>
                                                <div className="flex items-center gap-2 px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg border border-solid border-[#dce3dd]">
                                                    <div className="flex items-center justify-center w-5 h-5 text-[#556858] shrink-0"
                                                         aria-hidden="true">
                                                        <Icon className="w-5 h-5"/>
                                                    </div>
                                                    <input
                                                        className="relative min-w-0 flex-1 -mt-px font-normal text-[#1e291f] text-[15px] tracking-normal leading-[normal]"
                                                        id={field.id}
                                                        name={field.id}
                                                        type={field.type ?? "text"}
                                                        value={product[field.id]}
                                                        onChange={handleChange}
                                                        placeholder={field.placeholder}
                                                        aria-label={field.label}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
                            <Link
                                href="/estoque"
                                className="flex items-center justify-center px-0 py-3.5 relative self-stretch w-full flex-[0_0_auto] bg-[#2d5a27] rounded-[10px] hover:bg-[#23491f] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]"
                            >
                                <span className="relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-white text-base tracking-normal leading-[normal]">
                                    Salvar Alterações
                                </span>
                            </Link>
                            <Link
                                href="/estoque"
                                className="flex items-center justify-center px-0 py-3.25 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] border border-solid border-[#d32f2f] hover:bg-[#fff5f5] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#d32f2f]"
                            >
                                <span className="relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#d32f2f] text-base tracking-normal leading-[normal]">
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