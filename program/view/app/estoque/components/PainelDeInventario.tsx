'use client'

import { useState } from "react";
import {Apple, Beef, LucideIcon, Milk, Plus, Trash2, Utensils } from "lucide-react";
import {fraunces, instrumentSans} from "@/util/Fonts";
import Slogan from "@/components/Slogan";
import Link from "next/link";

type InventoryItem = {
    id: number;
    name: string;
    expiration: string;
    category: string;
    icon: LucideIcon;
    iconBackground: string;
    status: "Vence em breve" | "Dentro da validade";
};

const initialInventory: InventoryItem[] = [
    {
        id: 1,
        name: "Leite Integral",
        expiration: "31/08/2026",
        category: "Laticínios",
        icon: Milk,
        iconBackground: "bg-[#e3f2fd]",
        status: "Vence em breve",
    },
    {
        id: 2,
        name: "Queijo Mussarela",
        expiration: "03/09/2026",
        category: "Laticínios",
        icon: Utensils,
        iconBackground: "bg-[#fffde7]",
        status: "Vence em breve",
    },
    {
        id: 3,
        name: "Iogurte Natural",
        expiration: "15/09/2026",
        category: "Laticínios",
        icon: Milk,
        iconBackground: "bg-[#f3e5f5]",
        status: "Dentro da validade",
    },
    {
        id: 4,
        name: "Peito de Frango",
        expiration: "29/08/2026",
        category: "Carnes",
        icon: Beef,
        iconBackground: "bg-[#ffebee]",
        status: "Vence em breve",
    },
    {
        id: 5,
        name: "Tomate Cereja",
        expiration: "10/09/2026",
        category: "Hortifruti",
        icon: Apple,
        iconBackground: "bg-[#e8f5e9]",
        status: "Dentro da validade",
    },
    {
        id: 6,
        name: "Manteiga Aviação",
        expiration: "20/09/2026",
        category: "Laticínios",
        icon: Utensils,
        iconBackground: "bg-[#fff8e1]",
        status: "Dentro da validade",
    },
];

const PainelDeInventario = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);

    const removeProduct = (id: number) => {
        setInventory((items) => items.filter((item) => item.id !== id));
    };

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
                            <div className="grid grid-cols-3 items-start gap-6 relative self-stretch w-full">
                                {inventory.map((item) => {
                                    const ItemIcon = item.icon;
                                    return (
                                        <Link
                                            href="/edicao-produto"
                                            key={item.id}
                                            className={`${instrumentSans.className} gap-5 p-6 flex-1 grow bg-white rounded-2xl border border-solid border-[#dce3dd] flex flex-col items-start relative min-w-0`}
                                        >
                                            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                                                <div
                                                    className={`flex w-12 h-12 items-center justify-center rounded-3xl ${item.iconBackground}`}
                                                >
                                                    <ItemIcon className="w-6 h-6 text-[#1e291f]" aria-hidden="true" />
                                                </div>
                                                <span
                                                    className={`inline-flex items-start px-3 py-1.5 relative flex-[0_0_auto] rounded-[20px] font-semibold text-xs ${
                                                        item.status === "Vence em breve"
                                                            ? "bg-[#fff3e0] text-[#e65100]"
                                                            : "bg-[#e8efe9] text-[#2d5a27]"
                                                    }`}
                                                >
                                                  {item.status}
                                                </span>
                                            </div>

                                            <div className="gap-1.5 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative">
                                                <h2 className={`${fraunces.className} font-bold text-[#1e291f] text-lg`}>
                                                    {item.name}
                                                </h2>
                                                <p className="font-normal text-[#556858] text-sm">
                                                    Validade:{" "}
                                                    <time
                                                        className={`font-semibold ${
                                                            item.status === "Vence em breve"
                                                                ? "text-[#e65100]"
                                                                : "text-[#1e291f]"
                                                        }`}
                                                    >
                                                        {item.expiration}
                                                    </time>
                                                </p>
                                            </div>

                                            <div className="w-full h-px bg-[#dce3dd]" />

                                            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                                                <span className="font-normal text-[#556858] text-[13px]">
                                                  {item.category}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeProduct(item.id)}
                                                    className="inline-flex items-center gap-1 relative flex-[0_0_auto] text-[#d32f2f] hover:text-[#a92323] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d32f2f] focus-visible:ring-offset-2 rounded"
                                                    aria-label={`Excluir ${item.name}`}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                                                    <span className="font-semibold text-sm">
                                                        Excluir
                                                    </span>
                                                </button>
                                            </div>
                                        </Link>
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