import { JSX, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import image1 from "./image.png";
import image from "./image.svg";
import leafAccentIllustration from "./leaf-accent-illustration.png";
import line from "./line.svg";
import recipePhoto from "./recipe-photo.png";
import recipePhoto2 from "./recipe-photo-2.png";
import vector from "./vector.svg";
import vector3 from "./vector-3.svg";

type Recipe = {
    title: string;
    image: StaticImageData | string;
    imageAlt: string;
    time: string;
    difficulty: string;
    ingredients: string;
    timeIcon: string;
};

const recipes: Recipe[] = [
    {
        title: "Macarrão ao Molho de Tomate",
        image: recipePhoto,
        imageAlt: "Macarrão ao molho de tomate",
        time: "30 min",
        difficulty: "Fácil",
        ingredients: "5 ingredientes",
        timeIcon: "/vector-2.svg",
    },
    {
        title: "Salada Caesar com Frango",
        image: image1,
        imageAlt: "Salada Caesar com frango",
        time: "20 min",
        difficulty: "Fácil",
        ingredients: "6 ingredientes",
        timeIcon: "/vector-4.svg",
    },
    {
        title: "Frango Grelhado com Legumes",
        image: recipePhoto2,
        imageAlt: "Frango grelhado com legumes",
        time: "45 min",
        difficulty: "Médio",
        ingredients: "8 ingredientes",
        timeIcon: "/vector-5.svg",
    },
];

type RecipeCardProps = {
    recipe: Recipe;
    onViewRecipe: (recipe: Recipe) => void;
};

const RecipeCard = ({ recipe, onViewRecipe }: RecipeCardProps): JSX.Element => {
    return (
        <article className="flex flex-col items-start justify-between flex-1 grow bg-white rounded-2xl overflow-hidden border border-solid border-[#dce3dd] relative self-stretch">
            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <Image
                    className="w-full h-45 object-cover relative self-stretch"
                    alt={recipe.imageAlt}
                    src={recipe.image}
                />
                <div className="flex flex-col items-start gap-3 p-5 w-full flex-[0_0_auto] relative self-stretch">
                    <h2 className="-mt-px font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-xl tracking-normal leading-[normal] relative self-stretch">
                        {recipe.title}
                    </h2>
                    <div
                        className="flex flex-wrap items-start gap-[12px_12px] relative self-stretch w-full flex-[0_0_auto]"
                        aria-label={`${recipe.time}, ${recipe.difficulty}, ${recipe.ingredients}`}
                    >
                        <div className="gap-1 bg-[#f7f9f6] inline-flex items-center px-2 py-1 relative flex-[0_0_auto] rounded-md">
                            <div
                                className="flex flex-col w-3 h-3 items-center justify-center relative"
                                aria-hidden="true"
                            >
                                <div
                                    className="relative w-3 h-3 bg-position-[100%_100%]"
                                    style={{ backgroundImage: `url(${recipe.timeIcon})` }}
                                />
                            </div>
                            <span className="font-['Instrument_Sans-Medium',Helvetica] font-medium text-[#556858] relative w-fit -mt-px text-xs tracking-normal leading-[normal]">
                                {recipe.time}
                            </span>
                        </div>
                        <div className="bg-[#fff3e0] inline-flex items-center px-2 py-1 relative flex-[0_0_auto] rounded-md">
                            <span className="font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#e65100] text-xs tracking-normal leading-[normal]">
                                {recipe.difficulty}
                            </span>
                        </div>
                        <div className="bg-[#e8efe9] inline-flex items-center px-2 py-1 relative flex-[0_0_auto] rounded-md">
                            <span className="font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#2d5a27] relative w-fit -mt-px text-xs tracking-normal leading-[normal]">
                                {recipe.ingredients}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-col items-start pt-0 pb-5 px-5 flex relative self-stretch w-full flex-[0_0_auto]">
                <button
                    type="button"
                    className="flex items-center justify-center px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto] rounded-lg border border-solid border-[#2d5a27] font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#2d5a27] text-sm tracking-normal leading-[normal] transition-colors hover:bg-[#e8efe9] focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                    onClick={() => onViewRecipe(recipe)}
                >
                    Ver Receita
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
                className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-[0px_16px_32px_#2d5a2730]"
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
                            className="mt-2 font-['Fraunces-Bold',Helvetica] text-3xl font-bold text-[#1e291f]"
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
                <Image
                    className="mt-6 h-56 w-full rounded-xl object-cover"
                    src={recipe.image}
                    alt={recipe.imageAlt}
                />
                <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-md bg-[#f7f9f6] px-3 py-2 text-sm text-[#556858]">
                        {recipe.time}
                    </span>
                    <span className="rounded-md bg-[#fff3e0] px-3 py-2 text-sm text-[#e65100]">
                        {recipe.difficulty}
                    </span>
                    <span className="rounded-md bg-[#e8efe9] px-3 py-2 text-sm text-[#2d5a27]">
                        {recipe.ingredients}
                    </span>
                </div>
                <button
                    type="button"
                    className="mt-8 w-full rounded-lg bg-[#2d5a27] px-6 py-3.5 font-['Instrument_Sans-SemiBold',Helvetica] text-base font-semibold text-white hover:bg-[#23491f] focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

const TelaReceitas = (): JSX.Element => {
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [generationMessage, setGenerationMessage] = useState("");

    const handleGenerateRecipes = (): void => {
        setGenerationMessage("Novas receitas geradas com base no seu estoque.");
    };

    const handleBackToStock = (): void => {
        setGenerationMessage("Voltando ao estoque.");
    };

    return (
        <main className="flex min-h-256 flex-col items-center relative bg-[#f7f9f6]">
            <header className="flex justify-between px-20 py-6 self-stretch w-full bg-transparent items-center relative flex-[0_0_auto]">
                <Link
                    className="inline-flex items-center gap-2 relative flex-[0_0_auto] focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                    href="https://nowaste-app.com"
                    aria-label="NoWaste - voltar à página inicial"
                >
                    <span className="flex flex-col w-8 h-8 items-center justify-center relative bg-[#2d5a27] rounded-2xl">
                        <span className="relative w-4.5 h-4.5">
                            <Image
                                className="w-[97.23%] left-[2.77%] absolute h-full top-0"
                                alt=""
                                aria-hidden="true"
                                src={vector3}
                            />
                        </span>
                    </span>
                    <span className="relative w-fit font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-xl tracking-normal leading-[normal]">
                        NoWaste
                    </span>
                </Link>
                <nav
                    className="inline-flex gap-6 items-center relative flex-[0_0_auto]"
                    aria-label="Navegação principal"
                >
                    <Link
                        className="relative w-fit -mt-px font-['Instrument_Sans-Medium',Helvetica] font-medium text-[#556858] text-sm tracking-normal leading-[normal] hover:text-[#2d5a27] focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                        href="https://nowaste-app.com"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Voltar a Home
                    </Link>
                </nav>
            </header>
            <section className="flex flex-col items-center justify-center pt-10 pb-20 px-0 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col w-280 max-w-[calc(100%-2rem)] items-center justify-center relative flex-[0_0_auto]">
                    <Image
                        className="absolute -top-30 right-0 w-60 h-55 object-cover"
                        alt=""
                        aria-hidden="true"
                        src={leafAccentIllustration}
                    />
                    <div
                        className="absolute left-[calc(50.00%-490px)] -bottom-10 w-245 h-20 bg-[#e8efe9] rounded-[490px/40px] blur-[20px] opacity-50"
                        aria-hidden="true"
                    />
                    <div className="flex flex-col items-start gap-10 p-12 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710]">
                        <div className="items-center justify-around flex relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex flex-col items-start gap-2 relative flex-1 grow">
                                <h1 className="relative self-stretch -mt-px font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-4xl tracking-normal leading-[normal]">
                                    Receitas Sugeridas
                                </h1>
                                <p className="relative self-stretch font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#556858] text-base tracking-normal leading-[normal]">
                                    Receitas geradas com base nos itens do seu estoque
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            {recipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.title}
                                    recipe={recipe}
                                    onViewRecipe={setSelectedRecipe}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <Image
                                className="-mt-px relative self-stretch w-full h-px object-cover"
                                alt=""
                                aria-hidden="true"
                                src={line}
                            />
                            <div className="flex items-start justify-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center px-8 py-3.5 relative flex-[0_0_auto] bg-[#2d5a27] rounded-[10px] font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-white text-base tracking-normal leading-[normal] hover:bg-[#23491f] focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                                    onClick={handleGenerateRecipes}
                                >
                                    Gerar Novas Receitas
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center px-8 py-3.5 relative flex-[0_0_auto] rounded-[10px] border border-solid border-[#2d5a27] font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#2d5a27] text-base tracking-normal leading-[normal] hover:bg-[#e8efe9] focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                                    onClick={handleBackToStock}
                                >
                                    Voltar ao Estoque
                                </button>
                            </div>
                            <Image
                                className="relative self-stretch w-full h-px object-cover"
                                alt=""
                                aria-hidden="true"
                                src={image}
                            />
                            <div className="inline-flex items-center gap-2 px-4 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md">
                                <div className="relative w-3.5 h-3.5">
                                    <Image
                                        className="w-[98.81%] left-0 absolute h-full top-0"
                                        alt=""
                                        aria-hidden="true"
                                        src={vector}
                                    />
                                </div>
                                <span className="relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#2d5a27] text-sm tracking-normal leading-[normal]">
                                    Desperdício zero com NoWaste
                                </span>
                            </div>
                            <p className="sr-only" aria-live="polite">
                                {generationMessage}
                            </p>
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

export default TelaReceitas