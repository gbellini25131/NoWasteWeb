import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import { Leaf, UserKey, UserPlus } from "lucide-react";

import folha from "../../public/folha.png";

// Carregamento otimizado das fontes via Next.js Font Optimization
const fraunces = Fraunces({
    subsets: ["latin"],
    display: "swap",
});

type AccessOption = {
    title: string;
    description: string;
    action: string;
    href: string;
    actionClassName: string;
};

const accessOptions: AccessOption[] = [
    {
        title: "Entrar na sua conta",
        description:
            "Entre em uma conta existente e navegue pelo seu estoque e receitas",
        action: "Fazer Login",
        href: "/Login", // Atualizado de "/TelaLogin" para "/Login"
        actionClassName:
            "bg-[#2d5a27] text-white border border-solid border-[#2d5a27]",
    },
    {
        title: "Criar uma conta",
        description:
            "Cria sua conta NoWaste para controlar seu estoque e sugerir receitas",
        action: "Cadastrar-se",
        href: "/Cadastro", // Atualizado de "/TelaCadastro" para "/Cadastro"
        actionClassName:
            "bg-transparent text-[#2d5a27] border border-solid border-[#2d5a27]",
    },
];

const TelaInicio = () => {
    return (
        <div className="flex flex-col min-h-256 items-center relative bg-[#f7f9f6]">
            <header className="flex justify-between px-20 py-6 self-stretch w-full bg-transparent items-center relative flex-[0_0_auto]">
                <Link
                    href="/"
                    aria-label="NoWaste - página inicial"
                    className="inline-flex items-center gap-2 relative flex-[0_0_auto] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#2d5a27]"
                >
                    <span className="flex w-8 h-8 items-center justify-center bg-[#2d5a27] rounded-2xl">
                        <Leaf className="w-4 h-4 text-white" />
                    </span>
                    <span
                        className={`${fraunces.className} relative w-fit font-bold text-[#1e291f] text-xl tracking-normal leading-[normal]`}
                    >
                        NoWaste
                    </span>
                </Link>
                <nav aria-label="Navegação principal">
                    <Link
                        href="/"
                        className={`${fraunces.className} relative w-fit -mt-px font-medium text-[#556858] text-sm tracking-normal leading-[normal] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#2d5a27]`}
                    >
                        Voltar a Home
                    </Link>
                </nav>
            </header>
            <main className="flex flex-col h-219.75 items-center justify-center pt-10 pb-20 px-0 relative self-stretch w-full">
                <div className="flex flex-col w-160 max-w-full items-center justify-center relative flex-[0_0_auto]">
                    <Image
                        className="absolute -top-35 right-0 w-60 h-60 object-cover"
                        alt="Ilustração de folhas"
                        src={folha}
                    />
                    <div
                        aria-hidden="true"
                        className="absolute left-[calc(50.00%-260px)] -bottom-10 w-130 h-20 bg-[#e8efe9] rounded-[260px/40px] blur-[20px] opacity-50"
                    />
                    <section
                        aria-labelledby="welcome-heading"
                        className="flex flex-col w-150 max-w-[calc(100vw-2rem)] items-start gap-8 p-10 relative flex-[0_0_auto] bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710]"
                    >
                        <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <h1
                                id="welcome-heading"
                                className={`${fraunces.className} relative self-stretch -mt-px font-bold text-[#1e291f] text-[32px] text-center tracking-normal leading-[normal]`}
                            >
                                Bem-vindo ao NoWaste
                            </h1>
                            <p
                                className={`${fraunces.className} relative self-stretch font-normal text-[#556858] text-[15px] text-center tracking-normal leading-[22.5px]`}
                            >
                                Escolha como deseja continuar
                            </p>
                        </div>
                        <div className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto] max-[640px]:flex-col">
                            {accessOptions.map((option, index) => (
                                <article
                                    key={option.title}
                                    className="flex flex-col items-center gap-4 p-6 relative flex-1 self-stretch grow bg-[#f7f9f6] rounded-2xl border border-solid border-[#dce3dd] max-[640px]:w-full"
                                >
                                    <div className="flex w-20 h-20 items-center justify-center bg-white rounded-[40px]">
                                        {index === 0 ? (
                                            <UserKey className="w-8 h-8 text-[#2d5a27]" />
                                        ) : (
                                            <UserPlus className="w-8 h-8 text-[#2d5a27]" />
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
                                        <h2
                                            className={`${fraunces.className} relative self-stretch -mt-px font-bold text-[#1e291f] text-lg text-center tracking-normal leading-[normal]`}
                                        >
                                            {option.title}
                                        </h2>
                                        <p
                                            className={`${fraunces.className} relative self-stretch font-normal text-[#556858] text-[13px] text-center tracking-normal leading-[normal]`}
                                        >
                                            {option.description}
                                        </p>
                                    </div>
                                    <Link
                                        href={option.href}
                                        className={`${fraunces.className} flex items-center justify-center px-6 py-3 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] font-semibold text-[15px] tracking-normal leading-[normal] whitespace-nowrap transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27] ${option.actionClassName}`}
                                    >
                                        {option.action}
                                    </Link>
                                </article>
                            ))}
                        </div>
                        <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="inline-flex items-center gap-1.5 px-3 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md">
                                <Leaf className="w-3.5 h-3.5 text-[#2d5a27]" />
                                <span
                                    className={`${fraunces.className} relative w-fit -mt-px font-semibold text-[#2d5a27] text-xs tracking-normal leading-[normal]`}
                                >
                                    Desperdício zero com NoWaste
                                </span>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default TelaInicio;