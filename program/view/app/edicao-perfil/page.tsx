'use client'

import { JSX, SyntheticEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Leaf, LucideIcon, User, Mail, Smartphone, Lock } from "lucide-react";
import { fraunces, instrumentSans } from "@/util/Fonts";

import folha from "../../public/folha.png";

type FormValues = {
    name: string;
    email: string;
    phone: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

type FormField = {
    id: keyof FormValues;
    label: string;
    placeholder: string;
    type: string;
    icon: LucideIcon;
    autoComplete: string;
};

const initialFormValues: FormValues = {
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
};

const formRows: FormField[][] = [
    [
        {
            id: "name",
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
    ],
    [
        {
            id: "phone",
            label: "Telefone",
            placeholder: "(00) 00000-0000",
            type: "tel",
            icon: Smartphone,
            autoComplete: "tel",
        },
        {
            id: "currentPassword",
            label: "Senha atual",
            placeholder: "Digite sua senha atual",
            type: "password",
            icon: Lock,
            autoComplete: "current-password",
        },
    ],
    [
        {
            id: "newPassword",
            label: "Nova senha",
            placeholder: "Crie uma nova senha",
            type: "password",
            icon: Lock,
            autoComplete: "new-password",
        },
        {
            id: "confirmPassword",
            label: "Confirmar nova senha",
            placeholder: "Confirme a nova senha",
            type: "password",
            icon: Lock,
            autoComplete: "new-password",
        },
    ],
];

const TelaEdicaoPerfil = (): JSX.Element => {
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (id: keyof FormValues, value: string): void => {
        setSubmitted(false);
        setFormValues((currentValues) => ({
            ...currentValues,
            [id]: value,
        }));
    };

    const handleSubmit = (event: SyntheticEvent): void => {
        event.preventDefault();

        if (
            formValues.newPassword &&
            formValues.newPassword !== formValues.confirmPassword
        ) {
            return;
        }

        setSubmitted(true);
    };

    const handleCancel = (): void => {
        setFormValues(initialFormValues);
        setSubmitted(false);
    };

    return (
        <div className="flex flex-col min-h-screen items-center relative bg-[#f7f9f6]">
            <header className="flex justify-between px-6 sm:px-20 py-6 w-full items-center">
                <div className="inline-flex items-center gap-2">
                    <span className="flex w-8 h-8 items-center justify-center bg-[#2d5a27] rounded-2xl">
                        <Leaf className="w-4 h-4 text-white" />
                    </span>
                    <span
                        className={`${fraunces.className} font-bold text-[#1e291f] text-xl`}
                    >
                        NoWaste
                    </span>
                </div>
                <nav
                    className="inline-flex gap-6 items-center"
                    aria-label="Navegação principal"
                >
                    <Link
                        className={`${instrumentSans.className} font-medium text-[#556858] text-sm transition-colors hover:text-[#2d5a27] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#2d5a27]`}
                        href="/navegacao"
                    >
                        Voltar à Tela Principal
                    </Link>
                </nav>
            </header>

            <main className="flex flex-col items-center justify-center py-10 px-4 w-full flex-1">
                <div className="flex flex-col w-full max-w-150 items-center justify-center relative">
                    <Image
                        className="absolute -top-27.5 right-0 w-60 h-60 object-cover pointer-events-none"
                        alt=""
                        aria-hidden="true"
                        src={folha}
                    />
                    <div
                        className="absolute left-[calc(50%-230px)] -bottom-10 w-115 h-20 bg-[#e8efe9] rounded-[230px/40px] blur-[20px] opacity-50 pointer-events-none"
                        aria-hidden="true"
                    />

                    <form
                        className="flex flex-col w-full max-w-140 items-stretch gap-7 p-6 sm:p-10 relative bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710] z-10"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col items-center gap-2 text-center w-full">
                            <h1 className={`${fraunces.className} font-bold text-[#1e291f] text-[28px] sm:text-[32px]`}>
                                Alterar seus dados
                            </h1>
                            <p className={`${instrumentSans.className} font-normal text-[#556858] text-[15px] leading-[22.5px]`}>
                                Atualize suas informações pessoais
                            </p>
                        </div>

                        <div className="flex flex-col gap-5 w-full">
                            {formRows.map((row, rowIndex) => (
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
                                    key={`form-row-${rowIndex}`}
                                >
                                    {row.map((field) => {
                                        const Icon = field.icon;
                                        return (
                                            <div
                                                className="flex flex-col items-start gap-1.5 w-full min-w-0"
                                                key={field.id}
                                            >
                                                <label
                                                    className={`${instrumentSans.className} font-semibold text-[#1e291f] text-sm`}
                                                    htmlFor={field.id}
                                                >
                                                    {field.label}
                                                </label>
                                                <div className="flex items-center gap-2 px-4 py-3 w-full bg-white rounded-lg border border-solid border-[#dce3dd] focus-within:border-[#2d5a27] focus-within:ring-1 focus-within:ring-[#2d5a27] transition-all">
                                                    <div
                                                        className="flex items-center justify-center w-5 h-5 text-[#556858] shrink-0"
                                                        aria-hidden="true"
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <input
                                                        className={`${instrumentSans.className} w-full min-w-0 font-normal text-[#556858] text-[15px] bg-transparent border-none p-0 focus:outline-none`}
                                                        id={field.id}
                                                        name={field.id}
                                                        placeholder={field.placeholder}
                                                        type={field.type}
                                                        autoComplete={field.autoComplete}
                                                        value={formValues[field.id]}
                                                        onChange={(event) =>
                                                            handleChange(field.id, event.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-4 w-full">
                            <button
                                className="flex items-center justify-center py-3.5 w-full bg-[#2d5a27] rounded-[10px] cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]"
                                type="submit"
                            >
                                <span className={`${instrumentSans.className} font-semibold text-white text-[15px]`}>
                                    Salvar Alterações
                                </span>
                            </button>
                            <button
                                className="flex items-center justify-center py-3.5 w-full rounded-[10px] border border-solid border-[#2d5a27] bg-transparent cursor-pointer transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]"
                                type="button"
                                onClick={handleCancel}
                            >
                                <span className={`${instrumentSans.className} font-semibold text-[#2d5a27] text-[15px]`}>
                                    Cancelar
                                </span>
                            </button>
                            <div
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#e8efe9] rounded-md"
                                role="status"
                                aria-live="polite"
                            >
                                <Leaf className="w-3.5 h-3.5 text-[#2d5a27]" />
                                <span className={`${instrumentSans.className} font-semibold text-[#2d5a27] text-xs`}>
                                    {submitted
                                        ? "Alterações salvas com sucesso"
                                        : "Desperdício zero com NoWaste"}
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default TelaEdicaoPerfil;