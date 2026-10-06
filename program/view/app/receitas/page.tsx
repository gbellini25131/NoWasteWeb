'use client';

import { JSX, useState } from "react";
import Image, { ImageProps } from "next/image";
import { Timer, LoaderCircle } from "lucide-react";
import { fraunces, instrumentSans } from "@/util/Fonts";
import Cabecalho from "@/components/Cabecalho";
import Link from "next/link";
import Slogan from "@/components/Slogan";

type Recipe = {
    title: string;
    image: string;
    imageAlt: string;
    time: string;
    difficulty: string;
    ingredients: string;
};

const recipes: Recipe[] = [
    {
        title: "Macarrão ao Molho de Tomate",
        image: "https://i0.wp.com/receitinhas.org/wp-content/uploads/2022/08/Sun-Dried-Tomato-Pasta-with-Corn_Hero-1536x896-1.webp?fit=1536%2C896&ssl=1",
        imageAlt: "Macarrão ao molho de tomate",
        time: "30 min",
        difficulty: "Fácil",
        ingredients: "5 ingredientes",
    },
    {
        title: "Salada Caesar com Frango",
        image: "https://www.arise-app.com/images/dishes/pt/salada-caesar-com-frango-odf1pf.webp",
        imageAlt: "Salada Caesar com frango",
        time: "20 min",
        difficulty: "Fácil",
        ingredients: "6 ingredientes",
    },
    {
        title: "Frango Grelhado com Legumes",
        image: "https://www.arise-app.com/images/dishes/pt/frango-grelhado-com-legumes-e-salada-fvhpud.webp",
        imageAlt: "Frango grelhado com legumes",
        time: "45 min",
        difficulty: "Médio",
        ingredients: "8 ingredientes",
    },
];

type ImageWithSpinnerProps = ImageProps & {
    wrapperClassName?: string;
};

const ImageWithSpinner = ({
                              wrapperClassName = "",
                              className = "",
                              alt,
                              ...props
                          }: ImageWithSpinnerProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={`relative overflow-hidden ${wrapperClassName}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#f7f9f6]/80 z-10">
                    <LoaderCircle className="w-6 h-6 animate-spin text-[#2d5a27]" />
                </div>
            )}
            <Image
                {...props}
                alt={alt}
                className={`${className} transition-opacity duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
};

type RecipeCardProps = {
    recipe: Recipe;
    onViewRecipe: (recipe: Recipe) => void;
};

const RecipeCard = ({ recipe, onViewRecipe }: RecipeCardProps): JSX.Element => {
    return (
        <article className={`${instrumentSans.className} flex flex-col items-start justify-between flex-1 grow bg-white rounded-2xl overflow-hidden border border-solid border-[#dce3dd] relative self-stretch`}>
            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <ImageWithSpinner
                    wrapperClassName="w-full h-45 relative self-stretch"
                    className="w-full h-45 object-cover relative self-stretch"
                    alt={recipe.imageAlt}
                    src={recipe.image}
                    width={400}
                    height={180}
                />
                <div className="flex flex-col items-start gap-3 p-5 w-full flex-[0_0_auto] relative self-stretch">
                    <h2 className={`${fraunces.className} -mt-px font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-xl tracking-normal leading-[normal] relative self-stretch`}>
                        {recipe.title}
                    </h2>
                    <div
                        className="flex flex-wrap items-start gap-[12px_12px] relative self-stretch w-full flex-[0_0_auto]"
                        aria-label={`${recipe.time}, ${recipe.difficulty}, ${recipe.ingredients}`}
                    >
                        <div className="inline-flex items-center gap-1.5 bg-[#f7f9f6] px-2.5 py-1 relative flex-[0_0_auto] rounded-md">
                            <Timer className="w-5 h-3.5 text-[#556858] shrink-0" aria-hidden="true" strokeWidth={3.5} />
                            <span className="font-medium text-[#556858] relative w-fit text-xs tracking-normal leading-[normal]">
                                {recipe.time}
                            </span>
                        </div>
                        <div className="bg-[#fff3e0] inline-flex items-center px-2.5 py-1 relative flex-[0_0_auto] rounded-md">
                            <span className="font-semibold text-[#e65100] text-xs tracking-normal leading-[normal]">
                                {recipe.difficulty}
                            </span>
                        </div>
                        <div className="bg-[#e8efe9] inline-flex items-center px-2.5 py-1 relative flex-[0_0_auto] rounded-md">
                            <span className="font-semibold text-[#2d5a27] relative w-fit text-xs tracking-normal leading-[normal]">
                                {recipe.ingredients}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-col items-start pt-0 pb-5 px-5 flex relative self-stretch w-full flex-[0_0_auto]">
                <button
                    type="button"
                    className={`${instrumentSans.className} flex h-11 w-full items-center justify-center text-center px-4 rounded-xl border border-[#2d5a27] text-[#2d5a27] bg-transparent hover:bg-[#2d5a27] hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]`}
                    onClick={() => onViewRecipe(recipe)}
                >
                    <span className="font-semibold text-sm leading-none">
                        Ver Receita
                    </span>
                </button>
            </div>
        </article>
    );
};

type RecipeDialogProps = {
    recipe: Recipe;
    onClose: () => void;
};

const RecipeDialog = ({ recipe, onClose }: RecipeDialogProps): JSX.Element => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e291f]/40 p-6"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className={`${instrumentSans.className} w-full max-w-lg rounded-2xl bg-white p-8 shadow-[0px_16px_32px_#2d5a2730]`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="recipe-dialog-title"
            >
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <p className="font-['Instrument_Sans-Medium',Helvetica] text-sm text-[#556858]">
                            Receita sugerida
                        </p>
                        <h2
                            id="recipe-dialog-title"
                            className={`${fraunces.className} mt-2 text-3xl font-bold text-[#1e291f]`}
                        >
                            {recipe.title}
                        </h2>
                    </div>
                    <button
                        type="button"
                        className="rounded-md px-2 py-1 text-2xl leading-none text-[#556858] hover:bg-[#f7f9f6] focus-visible:ring-2 focus-visible:ring-[#2d5a27]"
                        aria-label="Fechar receita"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>
                <ImageWithSpinner
                    wrapperClassName="mt-6 h-56 w-full rounded-xl"
                    className="h-56 w-full rounded-xl object-cover"
                    src={recipe.image}
                    alt={recipe.imageAlt}
                    width={500}
                    height={224}
                />
                <div className="mt-6 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-[#f7f9f6] px-3 py-2 text-sm text-[#556858]">
                        <Timer className="w-4 h-4 text-[#556858] shrink-0" aria-hidden="true" strokeWidth={3.5} />
                        {recipe.time}
                    </span>
                    <span className="rounded-md bg-[#fff3e0] px-3 py-2 text-sm text-[#e65100] font-semibold">
                        {recipe.difficulty}
                    </span>
                    <span className="rounded-md bg-[#e8efe9] px-3 py-2 text-sm text-[#2d5a27] font-semibold">
                        {recipe.ingredients}
                    </span>
                </div>
                <button
                    type="button"
                    className="mt-8 w-full rounded-lg bg-[#2d5a27] px-6 py-3.5 text-base font-semibold text-white hover:bg-[#23491f] focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

const TelaReceitas = () => {
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    return (
        <main className="flex min-h-256 flex-col items-center relative bg-[#f7f9f6]">
            <div className="w-full relative z-20">
                <Cabecalho onClickUrl="/navegacao" onClickScreen="à Tela Principal" ehInicio={false} />
            </div>

            {/* Ajustado: removido mt-6 e reduzido pt-20 para pt-6 */}
            <section className="flex flex-col items-center justify-center pt-6 pb-16 px-0 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col w-280 max-w-[calc(100%-2rem)] items-center justify-center relative flex-[0_0_auto]">
                    <div className="flex flex-col items-start gap-10 p-12 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710]">
                        <div className="items-center justify-around flex relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex flex-col items-start gap-2 relative flex-1 grow">
                                <h1 className={`${fraunces.className} relative self-stretch -mt-px font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-4xl tracking-normal leading-[normal]`}>
                                    Receitas Sugeridas
                                </h1>
                                <p className={`${instrumentSans.className} relative self-stretch font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#556858] text-base tracking-normal leading-[normal]`}>
                                    Receitas geradas com base nos itens do seu estoque
                                </p>
                            </div>
                        </div>
                        <div className={`flex items-start gap-6 relative self-stretch w-full flex-[0_0_auto]`}>
                            {recipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.title}
                                    recipe={recipe}
                                    onViewRecipe={setSelectedRecipe}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex items-start justify-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
                                <Link
                                    href="/sugestao-receitas"
                                    className={`${instrumentSans.className} h-11 inline-flex items-center justify-center text-center px-4 rounded-xl border border-[#2d5a27] text-[#2d5a27] bg-transparent hover:bg-[#2d5a27] hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]`}
                                >
                                    <span className="font-semibold text-sm leading-none">
                                        Gerar novas receitas
                                    </span>
                                </Link>
                                <Link
                                    href="/estoque"
                                    className={`${instrumentSans.className} h-11 inline-flex items-center justify-center text-center px-4 rounded-xl border border-[#2d5a27] text-[#2d5a27] bg-transparent hover:bg-[#2d5a27] hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]`}
                                >
                                    <span className="font-semibold text-sm leading-none">
                                        Voltar ao estoque
                                    </span>
                                </Link>
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md">
                                <Slogan />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {selectedRecipe && (
                <RecipeDialog
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                />
            )}
        </main>
    );
};

export default TelaReceitas;