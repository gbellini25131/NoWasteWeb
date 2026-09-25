'use client';

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import { Leaf, Lock, Mail } from "lucide-react";

import folha from "../../public/folha.png";

const fraunces = Fraunces({
    subsets: ["latin"],
    display: "swap",
});

const TelaLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className={`flex flex-col min-h-256 items-center relative bg-[#f7f9f6] ${fraunces.className}`}>
            <header className="flex justify-between px-20 py-6 self-stretch w-full bg-transparent items-center relative flex-[0_0_auto]">
                <Link
                    className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
                    href="/"
                    aria-label="NoWaste página inicial"
                >
                    <span className="flex w-8 h-8 items-center justify-center shrink-0 bg-[#2d5a27] rounded-2xl">
                        <Leaf className="w-4 h-4 text-white shrink-0" />
                    </span>
                    <span className="relative w-fit font-bold text-[#1e291f] text-xl tracking-normal leading-[normal]">
                        NoWaste
                    </span>
                </Link>
                <nav aria-label="Navegação principal">
                    <Link
                        className="inline-flex gap-6 items-center relative flex-[0_0_auto] font-medium text-[#556858] text-sm tracking-normal leading-[normal] hover:text-[#2d5a27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                        href="/"
                    >
                        Voltar a Home
                    </Link>
                </nav>
            </header>
            <section
                className="flex flex-col h-219.75 items-center justify-center pt-10 pb-20 px-0 relative self-stretch w-full"
                aria-labelledby="login-title"
            >
                <div className="flex flex-col w-120 items-center justify-center relative flex-[0_0_auto]">
                    <Image
                        className="absolute -top-30 right-0 w-60 h-60 object-cover"
                        alt=""
                        aria-hidden="true"
                        src={folha}
                    />
                    <div
                        className="absolute left-[calc(50.00%-190px)] -bottom-10 w-95 h-20 bg-[#e8efe9] rounded-[190px/40px] blur-[20px] opacity-50"
                        aria-hidden="true"
                    />
                    <form
                        className="flex-col w-110 items-start gap-8 p-10 bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710] flex relative flex-[0_0_auto]"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <h1
                                id="login-title"
                                className="relative self-stretch -mt-px font-bold text-[#1e291f] text-[32px] text-center tracking-normal leading-[normal]"
                            >
                                Entre na sua conta
                            </h1>
                            <p className="relative self-stretch font-normal text-[#556858] text-[15px] text-center tracking-normal leading-[22.5px]">
                                Entre na sua conta NoWaste informando email e senha
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                                <label
                                    className="relative self-stretch -mt-px font-semibold text-[#1e291f] text-sm tracking-normal leading-[normal]"
                                    htmlFor="input-1"
                                >
                                    Email
                                </label>
                                <div className="flex items-center gap-2 px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg border border-solid border-[#dce3dd] focus-within:ring-1 focus-within:ring-[#2d5a27]">
                                    <span className="flex items-center justify-center shrink-0">
                                        <Mail className="w-4.5 h-4.5 text-[#556858] shrink-0" />
                                    </span>
                                    <input
                                        className="relative flex-1 -mt-px font-normal text-[#556858] text-[15px] tracking-normal leading-[normal] [background:transparent] border-[none] p-0 focus:outline-none"
                                        id="input-1"
                                        name="email"
                                        placeholder="nowaste@example.com"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                                    <label
                                        className="relative self-stretch -mt-px font-semibold text-[#1e291f] text-sm tracking-normal leading-[normal]"
                                        htmlFor="password"
                                    >
                                        Senha
                                    </label>
                                    <div className="flex items-center gap-2 px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg border border-solid border-[#dce3dd] focus-within:ring-1 focus-within:ring-[#2d5a27]">
                                        <span className="flex items-center justify-center shrink-0">
                                            <Lock className="w-4.5 h-4.5 text-[#556858] shrink-0" />
                                        </span>
                                        <input
                                            className="relative flex-1 -mt-px font-normal text-[#556858] text-[15px] tracking-normal leading-[normal] [background:transparent] border-[none] p-0 focus:outline-none"
                                            id="password"
                                            name="password"
                                            placeholder="Digite sua senha"
                                            type="password"
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex items-start justify-end relative self-stretch w-full flex-[0_0_auto]">
                                    <Link
                                        className="relative w-fit -mt-px font-medium text-[#2d5a27] text-[13px] tracking-normal leading-[normal] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a27]"
                                        href="/forgot-password"
                                    >
                                        Esqueceu sua senha?
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <button
                                className="items-center justify-center px-0 py-3.5 self-stretch w-full bg-[#2d5a27] rounded-[10px] flex relative flex-[0_0_auto] hover:bg-[#24491f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2 cursor-pointer"
                                type="submit"
                            >
                                <span className="relative w-fit -mt-px font-semibold text-white text-base tracking-normal leading-[normal]">
                                    Entrar
                                </span>
                            </button>
                            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md">
                                <Leaf className="w-3.5 h-3.5 text-[#2d5a27] shrink-0" />
                                <span className="relative w-fit -mt-px font-semibold text-[#2d5a27] text-xs tracking-normal leading-[normal]">
                                    Desperdício zero com NoWaste
                                </span>
                            </div>
                            <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                                <span className="relative w-fit -mt-px font-normal text-[#556858] text-sm tracking-normal leading-[normal]">
                                    Novo por aqui?
                                </span>
                                <Link
                                    className="relative w-fit -mt-px font-semibold text-[#2d5a27] text-sm tracking-normal underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a27]"
                                    href="/app/Cadastro"
                                >
                                    Crie sua conta
                                </Link>
                            </div>
                            <span className="sr-only" aria-live="polite">
                                {submitted ? "Formulário enviado." : ""}
                            </span>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default TelaLogin;