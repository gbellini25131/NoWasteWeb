'use client';

import Link from "next/link";
import { Leaf, LucideIcon, Refrigerator, CircleUserRound, ScrollText } from "lucide-react";
import { fraunces, instrumentSans } from "@/util/Fonts";
import Folha from "@/components/Folha";
import Cabecalho from "@/components/Cabecalho";
import Slogan from "@/components/Slogan";

type ActionCard = {
    title: string;
    description: string;
    buttonLabel: string;
    icon: LucideIcon;
    href: string;
};

const actionCards: ActionCard[] = [
    {
        title: "Meu estoque",
        description: "Gerencie seus produtos e acompanhe as validades",
        buttonLabel: "Acessar estoque",
        icon: Refrigerator,
        href: "/estoque"
    },
    {
        title: "Editar Perfil",
        description: "Atualize suas informações pessoais e preferências",
        buttonLabel: "Editar Perfil",
        icon: CircleUserRound,
        href: "/edicao-perfil"
    },
    {
        title: "Sugestão de Receitas",
        description: "Receba receitas baseadas nos itens do seu estoque",
        buttonLabel: "Ver Receitas",
        icon: ScrollText,
        href: "/sugestao-receitas"
    },
];

const TelaNavegacao = () => {
    return (
        <main className="flex min-h-256 flex-col items-center relative bg-[#f7f9f6]">
            <Cabecalho onClickUrl="/inicio" onClickScreen="ao Início" ehInicio={false}/>
            <section className="flex flex-col h-219.75 items-center justify-center pt-10 pb-20 px-0 relative self-stretch w-full">
                <div className="flex flex-col w-180 items-center justify-center relative flex-[0_0_auto]">
                    <Folha />
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

                                        <Link
                                            href={card.href}
                                            aria-label={card.buttonLabel}
                                            className="flex h-11 w-full items-center justify-center text-center px-4 rounded-xl border border-[#2d5a27] text-[#2d5a27] bg-transparent hover:bg-[#2d5a27] hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]"
                                        >
                                            <span className="font-semibold text-sm text-center leading-none">
                                                {card.buttonLabel}
                                            </span>
                                        </Link>
                                    </article>
                                );
                            })}
                        </div>

                        <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <Slogan />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default TelaNavegacao;