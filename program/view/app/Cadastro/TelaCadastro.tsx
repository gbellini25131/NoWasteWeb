'use client';

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Mail, Lock, Leaf, CheckCircle2, LucideIcon } from "lucide-react";
import { Fraunces } from "next/font/google";

import folha from "../../public/folha.png";

const fraunces = Fraunces({
    subsets: ["latin"],
    display: "swap",
});

type FieldDefinition = {
    id: string;
    label: string;
    placeholder: string;
    type: "text" | "email" | "password";
    icon: LucideIcon;
    autoComplete: string;
};

const fields: FieldDefinition[] = [
    {
        id: "full-name",
        label: "Nome completo",
        placeholder: "Seu nome e sobrenome",
        type: "text",
        icon: User,
        autoComplete: "name",
    },
    {
        id: "email",
        label: "Email",
        placeholder: "seuemail@exemplo.com",
        type: "email",
        icon: Mail,
        autoComplete: "email",
    },
    {
        id: "password",
        label: "Senha",
        placeholder: "Crie uma senha forte",
        type: "password",
        icon: Lock,
        autoComplete: "new-password",
    },
    {
        id: "confirm-password",
        label: "Confirmar senha",
        placeholder: "Digite a senha novamente",
        type: "password",
        icon: Lock,
        autoComplete: "new-password",
    },
];

const TelaCadastro = () => {
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (id: string, value: string) => {
        setFormValues((currentValues) => ({
            ...currentValues,
            [id]: value,
        }));
        setSubmitted(false);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (formValues.password !== formValues["confirm-password"]) {
            const confirmationInput = form.elements.namedItem(
                "confirm-password",
            ) as HTMLInputElement | null;

            confirmationInput?.setCustomValidity("As senhas precisam ser iguais.");
            confirmationInput?.reportValidity();
            confirmationInput?.setCustomValidity("");
            return;
        }

        setSubmitted(true);
    };

    return (
        <main className={`flex flex-col min-h-256 items-center relative bg-[#f7f9f6] ${fraunces.className}`}>
            <header className="flex justify-between px-20 py-6 self-stretch w-full bg-transparent items-center relative flex-[0_0_auto]">
                <Link
                    href="/"
                    aria-label="NoWaste - página inicial"
                    className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
                >
                    <span className="flex items-center justify-center w-8 h-8 relative bg-[#2d5a27] rounded-2xl shrink-0">
                        <Leaf className="w-4.5 h-4.5 text-white" />
                    </span>
                    <span className="relative w-fit font-bold text-[#1e291f] text-xl tracking-normal leading-[normal]">
                        NoWaste
                    </span>
                </Link>
                <Link
                    href="/"
                    className="inline-flex gap-6 items-center relative flex-[0_0_auto] -mt-px font-medium text-[#556858] text-sm tracking-normal leading-[normal]"
                >
                    Voltar a Home
                </Link>
            </header>
            <section
                aria-labelledby="registration-title"
                className="flex flex-col h-219.75 items-center justify-center pt-10 pb-20 px-0 relative self-stretch w-full"
            >
                <div className="flex flex-col w-120 items-center justify-center relative flex-[0_0_auto]">
                    <Image
                        className="absolute -top-30 right-0 w-60 h-60 object-cover"
                        alt="Folhas decorativas"
                        src={folha}
                    />
                    <div
                        aria-hidden="true"
                        className="absolute left-[calc(50.00%-190px)] -bottom-10 w-95 h-20 bg-[#e8efe9] rounded-[190px/40px] blur-[20px] opacity-50"
                    />
                    <form
                        onSubmit={handleSubmit}
                        noValidate={false}
                        className="flex-col w-110 items-start gap-7 p-10 bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710] flex relative flex-[0_0_auto]"
                    >
                        <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <h1
                                id="registration-title"
                                className="relative self-stretch -mt-px font-bold text-[#1e291f] text-[32px] text-center tracking-normal leading-[normal]"
                            >
                                Crie sua conta
                            </h1>
                            <p className="relative self-stretch font-normal text-[#556858] text-[15px] text-center tracking-normal leading-[22.5px]">
                                Crie sua conta no sistema NoWaste informando alguns dados
                                cadastrais
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                            {fields.map((field) => {
                                const IconComponent = field.icon;
                                return (
                                    <div
                                        key={field.id}
                                        className="flex flex-col items-start gap-1.5 relative self-stretch w-full flex-[0_0_auto]"
                                    >
                                        <label
                                            htmlFor={field.id}
                                            className="relative self-stretch -mt-px font-semibold text-[#1e291f] text-sm tracking-normal leading-[normal]"
                                        >
                                            {field.label}
                                        </label>
                                        <div className="flex items-center gap-2 px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg border border-solid border-[#dce3dd]">
                                            <span className="flex items-center justify-center shrink-0 w-5 h-5 text-[#556858]">
                                                <IconComponent className="w-4.5 h-4.5" />
                                            </span>
                                            <input
                                                id={field.id}
                                                name={field.id}
                                                required
                                                type={field.type}
                                                value={formValues[field.id] ?? ""}
                                                onChange={(event) =>
                                                    handleChange(field.id, event.target.value)
                                                }
                                                placeholder={field.placeholder}
                                                autoComplete={field.autoComplete}
                                                className="relative flex-1 -mt-px font-normal text-[#556858] text-[15px] tracking-normal leading-[normal] bg-transparent border-none p-0 outline-none"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <button
                                type="submit"
                                className="items-center justify-center px-0 py-3.5 self-stretch w-full bg-[#2d5a27] rounded-[10px] flex relative flex-[0_0_auto] cursor-pointer"
                            >
                                <span className="relative w-fit -mt-px font-semibold text-white text-base tracking-normal leading-[normal]">
                                    Criar Conta
                                </span>
                            </button>
                            <div
                                role="status"
                                aria-live="polite"
                                className="inline-flex items-center gap-1.5 px-3 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md"
                            >
                                <span className="flex items-center justify-center shrink-0 text-[#2d5a27]">
                                    {submitted ? (
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    ) : (
                                        <Leaf className="w-3.5 h-3.5" />
                                    )}
                                </span>
                                <span className="relative w-fit -mt-px font-semibold text-[#2d5a27] text-xs tracking-normal leading-[normal]">
                                    {submitted
                                        ? "Conta criada com sucesso"
                                        : "Desperdício zero com NoWaste"}
                                </span>
                            </div>
                            <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                                <span className="relative w-fit -mt-px font-normal text-[#556858] text-sm tracking-normal leading-[normal]">
                                    Já tem uma conta?
                                </span>
                                <Link
                                    href="/app/Login"
                                    className="relative w-fit -mt-px font-semibold text-[#2d5a27] text-sm tracking-normal leading-[normal] underline"
                                >
                                    Entrar
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default TelaCadastro;