'use client';

import { JSX, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import folha from "../../public/folha.png";
import { Leaf, Utensils, Salad, CakeSlice, Check, CookingPot, LucideIcon } from "lucide-react";
import {fraunces, instrumentSans} from "@/util/Fonts";

type RecipeOption = {
    count: number;
    label: string;
    icon: LucideIcon;
};

const recipeOptions: RecipeOption[] = [
    {
        count: 1,
        label: "receita",
        icon: Utensils,
    },
    {
        count: 3,
        label: "receitas",
        icon: Salad,
    },
    {
        count: 5,
        label: "receitas",
        icon: CakeSlice,
    },
];

const TelaSugestaoReceitas = (): JSX.Element => {
    const [selectedCount, setSelectedCount] = useState<number>(3);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const handleGenerateRecipes = (): void => {
        setIsGenerating(true);
        window.setTimeout(() => {
            setIsGenerating(false);
        }, 700);
    };

    return (
        <main className="flex flex-col min-h-screen items-center relative bg-[#f7f9f6]">
            <header className="flex justify-between px-20 py-6 self-stretch w-full bg-transparent items-center relative flex-[0_0_auto]">
                <Link
                    href="/"
                    aria-label="NoWaste - Página inicial"
                    className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
                >
                    <span className="flex items-center justify-center w-8 h-8 bg-[#2d5a27] rounded-2xl">
                        <Leaf className="w-4 h-4 text-white" />
                    </span>
                    <span className={`${fraunces.className} relative w-fit font-bold text-[#1e291f] text-xl tracking-normal leading-[normal]`}>
                        NoWaste
                    </span>
                </Link>
                <nav aria-label="Navegação principal">
                    <Link
                        href="/"
                        className={`${instrumentSans.className} inline-flex gap-6 items-center relative flex-[0_0_auto] -mt-px font-medium text-[#556858] text-sm tracking-normal leading-[normal] hover:text-[#2d5a27]`}
                    >
                        Voltar a Home
                    </Link>
                </nav>
            </header>

            <section className="flex flex-col flex-1 items-center justify-center pt-5 pb-15 px-0 relative self-stretch w-full">
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
                            <h1 className={`${fraunces.className} relative self-stretch -mt-px font-bold text-[#1e291f] text-[32px] text-center tracking-normal leading-[normal]`}>
                                Sugestão de Receitas
                            </h1>
                            <p className={`${instrumentSans.className} relative self-stretch font-normal text-[#556858] text-[15px] text-center tracking-normal leading-[22.5px]`}>
                                Escolha quantas receitas deseja receber com base nos itens do seu
                                estoque
                            </p>
                        </div>

                        <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
                            <div
                                className="w-20 h-20 bg-[#e8efe9] rounded-2xl flex items-center justify-center"
                                aria-hidden="true"
                            >
                                <CookingPot className="w-9 h-9 text-[#2d5a27]" />
                            </div>
                        </div>

                        <fieldset className="flex flex-col gap-1.5 items-start relative self-stretch w-full flex-[0_0_auto]">
                            <legend className={`${instrumentSans.className} relative self-stretch -mt-px font-semibold text-[#1e291f] text-sm tracking-normal leading-[normal]`}>
                                Quantas receitas você deseja?
                            </legend>

                            <div className="gap-4 flex items-start relative self-stretch w-full flex-[0_0_auto] pt-4">
                                {recipeOptions.map((option) => {
                                    const isSelected = selectedCount === option.count;
                                    const OptionIcon = option.icon;

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
                                                    className="w-5 h-5 absolute top-3 right-3 bg-[#2d5a27] rounded-2xl flex items-center justify-center"
                                                    aria-hidden="true"
                                                >
                                                    <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                                                </span>
                                            )}

                                            <div className="w-7 h-7 flex items-center justify-center">
                                                <OptionIcon
                                                    className={`w-7 h-7 ${
                                                        isSelected ? "text-[#2d5a27]" : "text-[#718373]"
                                                    }`}
                                                />
                                            </div>

                                            <span className="flex-col gap-0.5 relative self-stretch w-full flex items-center">
                                                <span
                                                    className={`${fraunces.className} relative w-fit -mt-px font-bold text-[28px] tracking-normal leading-[normal] ${
                                                        isSelected ? "text-[#2d5a27]" : "text-[#1e291f]"
                                                    }`}
                                                >
                                                    {option.count}
                                                </span>
                                                <span
                                                    className={`${instrumentSans.className} relative w-fit ${
                                                        isSelected ? "font-semibold text-[#2d5a27]" : "font-normal text-[#556858]"
                                                    } text-[13px] tracking-normal leading-[normal]`}
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
                                className="flex items-center justify-center px-0 py-3.5 relative self-stretch w-full flex-[0_0_auto] bg-[#2d5a27] hover:bg-[#23471f] transition-colors rounded-[10px] disabled:cursor-wait disabled:opacity-80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]"
                            >
                                <span className={`${instrumentSans.className} relative w-fit -mt-px font-semibold text-white text-base tracking-normal leading-[normal]`}>
                                    {isGenerating ? "Gerando..." : "Gerar receitas"}
                                </span>
                            </button>

                            <div className="inline-flex items-center gap-1.5 px-3 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md">
                                <Leaf className="w-3.5 h-3.5 text-[#2d5a27]" />
                                <span className={`${instrumentSans.className} relative w-fit -mt-px font-semibold text-[#2d5a27] text-[13px] tracking-normal leading-[normal]`}>
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

export default TelaSugestaoReceitas;