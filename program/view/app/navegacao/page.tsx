'use client';

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import image from "./image.svg";
import folha from "../../public/folha.png";
import vector from "./vector.svg";
import vector2 from "./vector-2.svg";
import logo from "../../public/logo-branca.png";
import vector4 from "./vector-4.svg";

type IconKey = "stock" | "profile" | "recipes";

type ActionCard = {
    title: string;
    description: string;
    buttonLabel: string;
    icon: IconKey;
    primary: boolean;
};

const actionCards: ActionCard[] = [
    {
        title: "Meu Estoque",
        description: "Gerencie seus produtos e acompanhe as validades",
        buttonLabel: "Acessar Estoque",
        icon: "stock",
        primary: true,
    },
    {
        title: "Editar Perfil",
        description: "Atualize suas informações pessoais e preferências",
        buttonLabel: "Editar Perfil",
        icon: "profile",
        primary: false,
    },
    {
        title: "Sugestão de Receitas",
        description: "Receba receitas baseadas nos itens do seu estoque",
        buttonLabel: "Ver Receitas",
        icon: "recipes",
        primary: false,
    },
];

const iconAssets: Record<IconKey, StaticImageData> = {
    stock: logo,
    profile: vector,
    recipes: image,
};

export const NowasteNavegacao = () => {
    const [selectedAction, setSelectedAction] = useState<string>("");

    const handleAction = (action: string) => {
        setSelectedAction(action);
    };

    return (
        <main className="flex min-h-256 flex-col items-center relative bg-[#f7f9f6]">
            <header className="flex justify-between px-20 py-6 self-stretch w-full bg-transparent items-center relative flex-[0_0_auto]">
                <Link
                    href="/"
                    aria-label="NoWaste - voltar para a página inicial"
                    className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
                >
                    <span className="flex flex-col w-8 h-8 items-center justify-center relative bg-[#2d5a27] rounded-2xl">
                        <span className="relative w-4.5 h-4.5">
                            <Image
                                className="absolute w-[97.22%] h-full top-0 left-[2.78%]"
                                alt=""
                                aria-hidden="true"
                                src={vector4}
                            />
                        </span>
                    </span>
                    <span className="relative w-fit font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-xl tracking-normal leading-[normal]">
                        NoWaste
                    </span>
                </Link>
                <nav aria-label="Navegação principal">
                    <Link
                        href="/"
                        className="inline-flex gap-6 items-center relative flex-[0_0_auto] font-['Instrument_Sans-Medium',Helvetica] font-medium text-[#556858] text-sm tracking-normal leading-[normal] hover:text-[#2d5a27] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#2d5a27]"
                    >
                        Voltar a Home
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
                            <h1 className="relative self-stretch -mt-px font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-[32px] text-center tracking-normal leading-[normal]">
                                O que deseja fazer?
                            </h1>
                            <p className="relative self-stretch font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#556858] text-[15px] text-center tracking-normal leading-[22.5px]">
                                Escolha uma das opções abaixo para continuar
                            </p>
                        </div>
                        <div className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                            {actionCards.map((card) => (
                                <article
                                    key={card.title}
                                    className="flex flex-col items-center gap-4 p-6 relative flex-1 self-stretch grow bg-[#f7f9f6] rounded-2xl border border-solid border-[#dce3dd]"
                                >
                                    <div className="flex w-16 h-16 items-center justify-center relative bg-white rounded-4xl">
                                        {card.icon === "stock" ? (
                                            <div className="relative w-7 h-7">
                                                <Image
                                                    className="absolute w-[91.07%] h-[95.23%] top-[4.77%] left-[8.93%]"
                                                    alt=""
                                                    aria-hidden="true"
                                                    src={iconAssets[card.icon]}
                                                />
                                            </div>
                                        ) : (
                                            <Image
                                                className={
                                                    card.icon === "profile"
                                                        ? "relative w-[23.58px] h-7"
                                                        : "relative w-[22.4px] h-3.5"
                                                }
                                                alt=""
                                                aria-hidden="true"
                                                src={iconAssets[card.icon]}
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
                                        <h2 className="relative self-stretch -mt-px font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-lg text-center tracking-normal leading-[normal]">
                                            {card.title}
                                        </h2>
                                        <p className="relative self-stretch h-13.5 font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#556858] text-[13px] text-center tracking-normal leading-[18.2px]">
                                            {card.description}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleAction(card.title)}
                                        aria-label={card.buttonLabel}
                                        className={
                                            card.primary
                                                ? "flex items-center justify-center px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-[#2d5a27] rounded-[10px] hover:bg-[#23481f] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27] cursor-pointer"
                                                : "flex items-center justify-center px-4 py-2.75 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] border border-solid border-[#2d5a27] hover:bg-[#e8efe9] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27] cursor-pointer"
                                        }
                                    >
                                        <span
                                            className={
                                                card.primary
                                                    ? "relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-white text-sm tracking-normal leading-[normal]"
                                                    : "relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#2d5a27] text-sm tracking-normal leading-[normal]"
                                            }
                                        >
                                            {card.buttonLabel}
                                        </span>
                                    </button>
                                </article>
                            ))}
                        </div>
                        <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <div
                                className="inline-flex items-center gap-1.5 px-3 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md"
                                role="status"
                                aria-live="polite"
                            >
                                <div className="relative w-3.5 h-3.5">
                                    <Image
                                        className="absolute w-[98.81%] h-full top-0 left-0"
                                        alt=""
                                        aria-hidden="true"
                                        src={vector2}
                                    />
                                </div>
                                <span className="relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#2d5a27] text-[13px] tracking-normal leading-[normal]">
                                    {selectedAction
                                        ? `${selectedAction} selecionado`
                                        : "Desperdício zero com NoWaste"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};