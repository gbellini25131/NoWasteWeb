'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import folha from "../../public/folha.png";

import { Leaf, LucideIcon, Refrigerator, CircleUserRound, ScrollText } from "lucide-react";
import {fraunces, instrumentSans} from "@/util/Fonts";

type ActionCard = {
    title: string;
    description: string;
    buttonLabel: string;
    icon: LucideIcon;
};

const actionCards: ActionCard[] = [
    {
        title: "Meu Estoque",
        description: "Gerencie seus produtos e acompanhe as validades",
        buttonLabel: "Acessar Estoque",
        icon: Refrigerator,
    },
    {
        title: "Editar Perfil",
        description: "Atualize suas informações pessoais e preferências",
        buttonLabel: "Editar Perfil",
        icon: CircleUserRound,
    },
    {
        title: "Sugestão de Receitas",
        description: "Receba receitas baseadas nos itens do seu estoque",
        buttonLabel: "Ver Receitas",
        icon: ScrollText,
    },
];

const TelaNavegacao = () => {
    const [selectedAction, setSelectedAction] = useState<string>("");

    const handleAction = (action: string) => {
        setSelectedAction(action);
    };

    return (
        <main className="flex min-h-256 flex-col items-center relative bg-[#f7f9f6]">
            <header className="flex justify-between px-20 py-6 self-stretch w-full bg-transparent items-center relative flex-[0_0_auto]">
                <Link
                    className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
                    href="/"
                    aria-label="NoWaste página inicial"
                >
                    <span className="flex w-8 h-8 items-center justify-center shrink-0 bg-[#2d5a27] rounded-2xl">
                        <Leaf className="w-4 h-4 text-white shrink-0" />
                    </span>
                    <span className={`${fraunces.className} relative w-fit font-bold text-[#1e291f] text-xl tracking-normal leading-[normal] `}>
                        NoWaste
                    </span>
                </Link>
                <nav aria-label="Navegação principal">
                    <Link
                        className={`${instrumentSans.className} inline-flex gap-6 items-center relative flex-[0_0_auto] font-medium text-[#556858] text-sm tracking-normal leading-[normal] hover:text-[#2d5a27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2`}
                        href="/inicio"
                    >
                        Voltar ao Início
                    </Link>
                </nav>
            </header>
            <section className="flex flex-col h-219.75 items-center justify-center pt-10 pb-20 px-0 relative self-stretch w-full">
                <div className="flex flex-col w-180 items-center justify-center relative flex-[0_0_auto]">
                    <Image
                        className="absolute -top-30 right-0 w-60 h-60 object-cover"
                        alt=""
                        aria-hidden="true"
                        src={folha}
                    />
                    <div
                        className="absolute left-[calc(50.00%-300px)] -bottom-10 w-150 h-20 bg-[#e8efe9] rounded-[300px/40px] blur-[20px] opacity-50"
                        aria-hidden="true"
                    />

                    <div className="flex flex-col w-170 items-start gap-8 p-10 relative flex-[0_0_auto] bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710]">
                        <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <h1 className={`${fraunces.className} relative self-stretch -mt-px font-bold text-[#1e291f] text-[32px] text-center tracking-normal leading-[normal]`}>
                                O que deseja fazer?
                            </h1>
                            <p className={`${instrumentSans.className} relative self-stretch font-normal text-[#556858] text-[15px] text-center tracking-normal leading-[22.5px]`}>
                                Escolha uma das opções abaixo para continuar
                            </p>
                        </div>

                        <div className={`${instrumentSans.className} flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]`}>
                            {actionCards.map((card) => {
                                const Icon = card.icon;
                                return (
                                    <article
                                        key={card.title}
                                        className="flex flex-col items-center gap-4 p-6 relative flex-1 self-stretch grow bg-[#f7f9f6] rounded-2xl border border-solid border-[#dce3dd]"
                                    >
                                        <div className="flex w-16 h-16 items-center justify-center shrink-0 bg-white rounded-full">
                                            <Icon className="w-7 h-7 text-[#2d5a27] shrink-0" />
                                        </div>

                                        <div className="flex flex-col items-center gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
                                            <h2 className={`${fraunces.className} relative self-stretch -mt-px font-bold text-[#1e291f] text-lg text-center tracking-normal leading-[normal]`}>
                                                {card.title}
                                            </h2>
                                            <p className="relative self-stretch h-13.5 font-normal text-[#556858] text-[13px] text-center tracking-normal leading-[18.2px]">
                                                {card.description}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleAction(card.title)}
                                            aria-label={card.buttonLabel}
                                            className={"button flex h-11 items-center justify-center px-4 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27] bg-[#2d5a27] hover:bg-[#23481f] text-white"}
                                        >
                                            <span className="relative w-fit -mt-px font-semibold text-sm tracking-normal leading-[normal]">
                                                {card.buttonLabel}
                                            </span>
                                        </button>
                                    </article>
                                );
                            })}
                        </div>

                        <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md">
                                <Leaf className="w-3.5 h-3.5 text-[#2d5a27] shrink-0" />
                                <span className={`${instrumentSans.className} relative w-fit -mt-px font-semibold text-[#2d5a27] text-xs tracking-normal leading-[normal]`}>
                                    Desperdício zero com NoWaste
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default TelaNavegacao;