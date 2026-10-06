'use client';

import Link from "next/link";
import { LucideIcon, Refrigerator, CircleUserRound, ScrollText } from "lucide-react";
import { fraunces, instrumentSans } from "@/util/Fonts";
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
        <main className="flex min-h-screen flex-col items-center bg-[#f7f9f6]">
            <Cabecalho onClickUrl="/inicio" onClickScreen="ao Início" ehInicio={false} />

            <section className="flex flex-1 items-center justify-center w-full px-4 py-10 sm:py-16">
                <div className="w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-10 shadow-[0px_16px_32px_#2d5a2710] flex flex-col items-center gap-8">

                    <header className="flex flex-col items-center gap-2 text-center max-w-md">
                        <h1 className={`${fraunces.className} text-2xl sm:text-[32px] font-bold text-[#1e291f] leading-tight`}>
                            O que deseja fazer?
                        </h1>
                        <p className={`${instrumentSans.className} text-sm sm:text-[15px] text-[#556858] leading-relaxed`}>
                            Escolha uma das opções abaixo para continuar
                        </p>
                    </header>

                    <div className={`${instrumentSans.className} grid grid-cols-1 md:grid-cols-3 gap-4 w-full`}>
                        {actionCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <article
                                    key={card.title}
                                    className="flex flex-col items-center justify-between gap-6 p-6 bg-[#f7f9f6] rounded-2xl border border-[#dce3dd] transition-shadow hover:shadow-md"
                                >
                                    <div className="flex flex-col items-center gap-4 w-full">
                                        <div className="flex w-16 h-16 items-center justify-center bg-white rounded-full shrink-0 shadow-sm">
                                            <Icon className="w-7 h-7 text-[#2d5a27]" />
                                        </div>

                                        <div className="flex flex-col items-center gap-1.5 text-center w-full">
                                            <h2 className={`${fraunces.className} font-bold text-[#1e291f] text-lg`}>
                                                {card.title}
                                            </h2>
                                            <p className="text-[#556858] text-[13px] leading-relaxed min-h-13.5 flex items-center justify-center">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>

                                    <Link
                                        href={card.href}
                                        className="flex h-11 w-full items-center justify-center text-center px-4 rounded-xl border border-[#2d5a27] text-[#2d5a27] bg-transparent hover:bg-[#2d5a27] hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]"
                                    >
                                        <span className="font-semibold text-sm leading-none">
                                            {card.buttonLabel}
                                        </span>
                                    </Link>
                                </article>
                            );
                        })}
                    </div>

                    <div className="flex flex-col items-center gap-6 w-full pt-2">
                        <Slogan />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default TelaNavegacao;