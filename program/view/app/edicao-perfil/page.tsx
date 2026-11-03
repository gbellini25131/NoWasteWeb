'use client'

import { SyntheticEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LucideIcon, User, Mail, Lock, Loader2 } from "lucide-react";
import { fraunces, instrumentSans } from "@/util/Fonts";
import Cabecalho from "@/components/Cabecalho";
import Slogan from "@/components/Slogan";

type FormValues = {
    name: string;
    email: string;
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

const TelaEdicaoPerfil = () => {
    const router = useRouter();
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("authToken");

            if (!userId) {
                setErrorMessage("Utilizador não identificado. Por favor, faça login novamente.");
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:5020/usuarios/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Erro ao carregar dados do utilizador.");
                }

                setFormValues((prev) => ({
                    ...prev,
                    name: data.nome || data.name || "",
                    email: data.email || "",
                }));
            } catch (error: any) {
                console.error("Erro ao carregar utilizador:", error);
                setErrorMessage("Não foi possível carregar os dados atuais.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (id: keyof FormValues, value: string): void => {
        setErrorMessage("");
        setSuccessMessage("");
        setFormValues((currentValues) => ({
            ...currentValues,
            [id]: value,
        }));
    };

    const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (
            formValues.newPassword &&
            formValues.newPassword !== formValues.confirmPassword
        ) {
            setErrorMessage("A nova senha e a confirmação não coincidem.");
            return;
        }

        setIsLoading(true);

        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("authToken");

            const response = await fetch(`http://localhost:5020/usuarios/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    nome: formValues.name,
                    email: formValues.email,
                    senhaAtual: formValues.currentPassword,
                    senha: formValues.newPassword || formValues.currentPassword,
                }),
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.message || "Erro ao atualizar perfil. Verifique seus dados."
                );
            }

            setSuccessMessage("Perfil atualizado com sucesso!");

            setFormValues((prev) => ({
                ...prev,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            }));
        } catch (error: any) {
            setErrorMessage(error.message || "Ocorreu um erro ao atualizar o perfil.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = (): void => {
        router.push("/navegacao");
    };

    return (
        <div className="flex flex-col min-h-screen items-center relative bg-[#f7f9f6]">
            <Cabecalho onClickUrl="/navegacao" onClickScreen="à Tela Principal" ehInicio={false} />
            <main className="flex flex-col items-center justify-center py-10 px-4 w-full flex-1">
                <div className="flex flex-col w-full max-w-150 items-center justify-center relative">
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

                        {/* Banner de Erro */}
                        {errorMessage && (
                            <div
                                className="w-full p-3.5 rounded-lg border font-bold text-sm text-center shadow-sm"
                                style={{ backgroundColor: '#f8d7da', color: '#842029', borderColor: '#f5c2c7' }}
                            >
                                {errorMessage}
                            </div>
                        )}

                        {/* Banner de Sucesso */}
                        {successMessage && (
                            <div
                                className="w-full p-3.5 rounded-lg border font-bold text-sm text-center shadow-sm"
                                style={{ backgroundColor: '#d1e7dd', color: '#0f5132', borderColor: '#badbcc' }}
                            >
                                {successMessage}
                            </div>
                        )}

                        <div className="flex flex-col gap-5 w-full">
                            {formRows.map((row, rowIndex) => (
                                <div
                                    className={
                                        row.length > 1
                                            ? "grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
                                            : "w-full"
                                    }
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
                                                <div className="flex items-center gap-2 px-4 py-3 w-full bg-white rounded-lg border border-solid border-[#dce3dd] focus-within:ring-1 focus-within:ring-[#2d5a27] transition-all">
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
                                className="flex items-center justify-center py-3.5 w-full bg-[#2d5a27] hover:bg-[#24491f] disabled:bg-[#2d5a27]/60 rounded-[10px] cursor-pointer transition-all focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                                ) : (
                                    <span className={`${instrumentSans.className} font-semibold text-white text-[15px]`}>
                                        Salvar Alterações
                                    </span>
                                )}
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
                            <Slogan />
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default TelaEdicaoPerfil;