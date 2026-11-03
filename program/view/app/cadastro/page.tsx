'use client';

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation"; // 1. Importado o roteador do Next.js
import Link from "next/link";
import { User, Mail, Lock, LucideIcon, Loader2 } from "lucide-react"; // Importado o Loader2
import { fraunces, instrumentSans } from "@/util/Fonts";
import Cabecalho from "@/components/Cabecalho";
import Slogan from "@/components/Slogan";
import { backend } from "@/util/api";

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
    const router = useRouter(); // 2. Instância do router

    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
    const [errorMessage, setErrorMessage] = useState(""); // Estado para guardar mensagens de erro

    const handleChange = (id: string, value: string) => {
        setFormValues((currentValues) => ({
            ...currentValues,
            [id]: value,
        }));
        setErrorMessage("");
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        // Validação local: verificação se as senhas coincidem
        if (formValues.password !== formValues["confirm-password"]) {
            setErrorMessage("As senhas não coincidem.");
            return;
        }

        setIsLoading(true);

        try {
            // 3. Chamada para o endpoint de cadastro de usuários da sua API
            await backend("usuarios", {
                method: "POST",
                body: JSON.stringify({
                    nome: formValues["full-name"],
                    email: formValues.email,
                    senha: formValues.password,
                }),
            });

            // O cadastro não cria uma sessão. O usuário precisa autenticar-se.
            router.push("/login");
        } catch (error: unknown) {
            setErrorMessage(error instanceof Error ? error.message : "Ocorreu um erro inesperado ao cadastrar.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen relative bg-[#f7f9f6]">
            <Cabecalho onClickUrl="/inicio" onClickScreen="ao Início" ehInicio={false} />
            <main
                aria-labelledby="registration-title"
                className="flex-1 flex flex-col items-center justify-center py-6 px-4 w-full"
            >
                <div className="flex flex-col w-120 max-w-full items-center justify-center relative flex-[0_0_auto]">
                    <form
                        onSubmit={handleSubmit}
                        className={`${instrumentSans.className} flex-col w-110 max-w-[calc(100vw-2rem)] items-start gap-7 p-10 bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710] flex relative flex-[0_0_auto]`}
                    >
                        <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <h1
                                id="registration-title"
                                className={`${fraunces.className} relative self-stretch -mt-px font-bold text-[#1e291f] text-[32px] text-center tracking-normal leading-[normal]`}
                            >
                                Crie sua conta
                            </h1>
                            <p className="relative self-stretch font-normal text-[#556858] text-[15px] text-center tracking-normal leading-[22.5px]">
                                Crie sua conta no sistema NoWaste informando alguns dados
                                cadastrais
                            </p>
                        </div>

                        {/* Alerta para exibição de erros do formulário ou da API */}
                        {errorMessage && (
                            <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                                {errorMessage}
                            </div>
                        )}

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
                                        <div className="flex items-center gap-2 px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg border border-solid border-[#dce3dd] focus-within:ring-1 focus-within:ring-[#2d5a27]">
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
                            {/* Botão de envio com estado de carregamento */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="items-center justify-center px-0 py-3.5 self-stretch w-full bg-[#2d5a27] hover:bg-[#24491f] disabled:bg-[#2d5a27]/60 rounded-[10px] flex relative flex-[0_0_auto] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2 transition-colors"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                                ) : (
                                    <span className="relative w-fit -mt-px font-semibold text-white text-base tracking-normal leading-[normal]">
                                        Criar Conta
                                    </span>
                                )}
                            </button>

                            <Slogan />
                            <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                                <span className="relative w-fit -mt-px font-normal text-[#556858] text-sm tracking-normal leading-[normal]">
                                    Já tem uma conta?
                                </span>
                                <Link
                                    href="/login"
                                    className="relative w-fit -mt-px font-semibold text-[#2d5a27] text-sm tracking-normal leading-[normal] underline"
                                >
                                    Entrar
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default TelaCadastro;
