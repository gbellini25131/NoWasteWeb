'use client';

import { JSX, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import image from "./image.svg";
import folha from "../../public/folha.png";
import vector from "./vector.svg";
import vector2 from "./vector-2.svg";
import logo from "../../public/logo-branca.png";
import vector4 from "./vector-4.svg";
import vector5 from "./vector-5.svg";
import vector6 from "./vector-6.svg";

type RecipeOption = {
    count: number;
    label: string;
    icon: StaticImageData;
    iconClassName: string;
    selectedIconClassName?: string;
};

const recipeOptions: RecipeOption[] = [
    {
        count: 1,
        label: "receita",
        icon: vector5,
        iconClassName: "absolute w-[91.67%] h-[95.84%] top-[4.16%] left-[8.33%]",
    },
    {
        count: 3,
        label: "receitas",
        icon: vector4,
        iconClassName: "absolute w-[91.67%] h-[90.35%] top-[9.65%] left-[8.33%]",
        selectedIconClassName:
            "absolute w-[91.67%] h-[90.35%] top-[9.65%] left-[8.33%]",
    },
    {
        count: 5,
        label: "receitas",
        icon: logo,
        iconClassName: "absolute w-[91.67%] h-[90.89%] top-[9.11%] left-[8.33%]",
    },
];

export const NowasteSugestao = (): JSX.Element => {
    const [selectedCount, setSelectedCount] = useState<number>(3);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const handleGenerateRecipes = (): void => {
        setIsGenerating(true);
        window.setTimeout(() => {
            setIsGenerating(false);
        }, 700);
    };

    return (
        <main className="flex flex-col min-h-256 items-center relative bg-[#f7f9f6]">
            <header className="flex justify-between px-20 py-6 self-stretch w-full bg-transparent items-center relative flex-[0_0_auto]">
                <Link
                    href="/"
                    aria-label="NoWaste - Página inicial"
                    className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
                >
                    <span className="flex flex-col w-8 h-8 items-center justify-center relative bg-[#2d5a27] rounded-2xl">
                        <span className="relative w-4.5 h-4.5">
                            <Image
                                className="absolute w-[97.22%] h-full top-0 left-[2.78%]"
                                alt=""
                                aria-hidden="true"
                                src={vector}
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
                        className="inline-flex gap-6 items-center relative flex-[0_0_auto] -mt-px font-['Instrument_Sans-Medium',Helvetica] font-medium text-[#556858] text-sm tracking-normal leading-[normal] hover:text-[#2d5a27]"
                    >
                        Voltar a Home
                    </Link>
                </nav>
            </header>

            <section className="flex flex-col h-236 items-center justify-center pt-5 pb-15 px-0 relative self-stretch w-full">
                <div className="flex flex-col w-160 items-center justify-center relative flex-[0_0_auto]">
                    <Image
                        className="absolute -top-27.5 right-0 w-60 h-60 object-cover"
                        alt="Ilustração decorativa de folhas"
                        src={folha}
                    />
                    <div
                        aria-hidden="true"
                        className="absolute left-[calc(50.00%-250px)] -bottom-10 w-125 h-20 bg-[#e8efe9] rounded-[250px/40px] blur-[20px] opacity-50"
                    />

                    <form
                        className="flex flex-col w-145 items-start gap-8 p-10 relative flex-[0_0_auto] bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710]"
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleGenerateRecipes();
                        }}
                    >
                        <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <h1 className="relative self-stretch -mt-px font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-[32px] text-center tracking-normal leading-[normal]">
                                Sugestão de Receitas
                            </h1>
                            <p className="relative self-stretch font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#556858] text-[15px] text-center tracking-normal leading-[22.5px]">
                                Escolha quantas receitas deseja receber com base nos itens do seu
                                estoque
                            </p>
                        </div>

                        <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
                            <div
                                className="w-24 h-24 bg-[#e8efe9] rounded-[48px] flex items-center justify-center relative"
                                aria-hidden="true"
                            >
                                <div className="w-12 h-12 flex flex-col items-center justify-center relative">
                                    <div className="relative w-12 h-12">
                                        <Image
                                            className="absolute w-[93.75%] h-[93.75%] top-[6.25%] left-[6.25%]"
                                            alt=""
                                            src={vector6}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <fieldset className="flex flex-col gap-1.5 items-start relative self-stretch w-full flex-[0_0_auto]">
                            <legend className="relative self-stretch -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#1e291f] text-sm tracking-normal leading-[normal]">
                                Quantas receitas você deseja?
                            </legend>

                            <div className="gap-4 flex items-start relative self-stretch w-full flex-[0_0_auto] pt-4">
                                {recipeOptions.map((option) => {
                                    const isSelected = selectedCount === option.count;
                                    return (
                                        <button
                                            key={option.count}
                                            type="button"
                                            aria-pressed={isSelected}
                                            onClick={() => setSelectedCount(option.count)}
                                            className={`${
                                                isSelected
                                                    ? "bg-[#f4f7f4] border-2 border-solid border-[#2d5a27]"
                                                    : "bg-white border border-solid border-[#dce3dd]"
                                            } flex flex-col items-center gap-3 p-5 relative flex-1 grow rounded-2xl transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27] cursor-pointer`}
                                        >
                                            {isSelected && (
                                                <span
                                                    className="w-5 h-5 justify-center absolute top-3 right-3 bg-[#2d5a27] rounded-[10px] flex items-center"
                                                    aria-hidden="true"
                                                >
                                                    <span className="w-3 h-3 flex flex-col items-center justify-center relative">
                                                        <span className="relative w-3 h-3">
                                                            <Image
                                                                className="absolute w-[91.66%] h-[83.33%] top-[16.67%] left-[8.34%]"
                                                                alt=""
                                                                src={vector2}
                                                            />
                                                        </span>
                                                    </span>
                                                </span>
                                            )}

                                            <span className="flex-col w-6 h-6 flex items-center justify-center relative">
                                                <span className="relative w-6 h-6">
                                                    <Image
                                                        className={
                                                            isSelected && option.selectedIconClassName
                                                                ? option.selectedIconClassName
                                                                : option.iconClassName
                                                        }
                                                        alt=""
                                                        src={option.icon}
                                                    />
                                                </span>
                                            </span>

                                            <span className="flex-col gap-0.5 relative self-stretch w-full flex-[0_0_auto] flex items-center">
                                                <span
                                                    className={`relative w-fit -mt-px font-['Fraunces-Bold',Helvetica] font-bold text-[28px] tracking-normal leading-[normal] ${
                                                        isSelected ? "text-[#2d5a27]" : "text-[#1e291f]"
                                                    }`}
                                                >
                                                    {option.count}
                                                </span>
                                                <span
                                                    className={`relative w-fit [font-family:${
                                                        isSelected
                                                            ? "'Instrument_Sans-SemiBold',Helvetica"
                                                            : "'Instrument_Sans-Regular',Helvetica"
                                                    }] font-${
                                                        isSelected ? "semibold" : "normal"
                                                    } text-[13px] tracking-normal leading-[normal] ${
                                                        isSelected ? "text-[#2d5a27]" : "text-[#556858]"
                                                    }`}
                                                >
                                                    {option.label}
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </fieldset>

                        <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <button
                                type="submit"
                                disabled={isGenerating}
                                className="flex items-center justify-center px-0 py-3.5 relative self-stretch w-full flex-[0_0_auto] bg-[#2d5a27] rounded-[10px] disabled:cursor-wait disabled:opacity-80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]"
                            >
                                <span className="relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-white text-base tracking-normal leading-[normal]">
                                    {isGenerating ? "Gerando..." : "Gerar Receitas"}
                                </span>
                            </button>

                            <div className="inline-flex items-center gap-1.5 px-3 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md">
                                <span className="relative w-3.5 h-3.5">
                                    <Image
                                        className="absolute w-[98.81%] h-full top-0 left-0"
                                        alt=""
                                        aria-hidden="true"
                                        src={image}
                                    />
                                </span>
                                <span className="relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#2d5a27] text-[13px] tracking-normal leading-[normal]">
                                    Desperdício zero com NoWaste
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};