import { FormEvent, JSX, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import image from "./image.svg";
import leafAccentIllustration from "./leaf-accent-illustration.png";
import line from "./line.svg";
import vector from "./vector.svg";
import vector2 from "./vector-2.svg";
import vector3 from "./vector-3.svg";
import vector4 from "./vector-4.svg";
import vector5 from "./vector-5.svg";
import vector6 from "./vector-6.svg";
import vector7 from "./vector-7.svg";

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
    icon: StaticImageData | string;
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
            icon: vector5,
            autoComplete: "name",
        },
        {
            id: "email",
            label: "Email",
            placeholder: "seuemail@exemplo.com",
            type: "email",
            icon: vector6,
            autoComplete: "email",
        },
    ],
    [
        {
            id: "phone",
            label: "Telefone",
            placeholder: "(00) 00000-0000",
            type: "tel",
            icon: vector3,
            autoComplete: "tel",
        },
        {
            id: "currentPassword",
            label: "Senha atual",
            placeholder: "Digite sua senha atual",
            type: "password",
            icon: vector7,
            autoComplete: "current-password",
        },
    ],
    [
        {
            id: "newPassword",
            label: "Nova senha",
            placeholder: "Crie uma nova senha",
            type: "password",
            icon: vector,
            autoComplete: "new-password",
        },
        {
            id: "confirmPassword",
            label: "Confirmar nova senha",
            placeholder: "Confirme a nova senha",
            type: "password",
            icon: image,
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

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
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
        <div className="flex flex-col min-h-256 items-center relative bg-[#f7f9f6]">
            <header className="flex justify-between px-20 py-6 self-stretch w-full bg-transparent items-center relative flex-[0_0_auto]">
                <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                    <div className="flex flex-col w-8 h-8 items-center justify-center relative bg-[#2d5a27] rounded-2xl">
                        <div className="relative w-4.5 h-4.5">
                            <Image
                                className="absolute w-[97.22%] h-full top-0 left-[2.78%]"
                                alt=""
                                aria-hidden="true"
                                src={vector4}
                            />
                        </div>
                    </div>
                    <div className="relative w-fit font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-xl tracking-normal leading-[normal]">
                        NoWaste
                    </div>
                </div>
                <nav
                    className="inline-flex gap-6 items-center relative flex-[0_0_auto]"
                    aria-label="Navegação principal"
                >
                    <Link
                        className="relative w-fit -mt-px font-['Instrument_Sans-Medium',Helvetica] font-medium text-[#556858] text-sm tracking-normal leading-[normal]"
                        href="/"
                    >
                        Voltar a Home
                    </Link>
                </nav>
            </header>
            <main className="flex flex-col h-219.75 items-center justify-center pt-5 pb-15 px-0 relative self-stretch w-full">
                <div className="flex flex-col w-150 items-center justify-center relative flex-[0_0_auto]">
                    <Image
                        className="absolute -top-27.5 right-0 w-60 h-60 object-cover"
                        alt=""
                        aria-hidden="true"
                        src={leafAccentIllustration}
                    />
                    <div
                        className="absolute left-[calc(50.00%-230px)] -bottom-10 w-115 h-20 bg-[#e8efe9] rounded-[230px/40px] blur-[20px] opacity-50"
                        aria-hidden="true"
                    />
                    <form
                        className="flex flex-col w-140 items-start gap-7 p-10 relative flex-[0_0_auto] bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710]"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <h1 className="relative self-stretch -mt-px font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-[32px] text-center tracking-normal leading-[normal]">
                                Alterar seus dados
                            </h1>
                            <p className="relative self-stretch font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#556858] text-[15px] text-center tracking-normal leading-[22.5px]">
                                Atualize suas informações pessoais
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                            {formRows.map((row, rowIndex) => (
                                <div
                                    className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]"
                                    key={`form-row-${rowIndex}`}
                                >
                                    {row.map((field) => (
                                        <div
                                            className="flex flex-col items-start gap-1.5 relative flex-1 grow"
                                            key={field.id}
                                        >
                                            <label
                                                className="relative self-stretch -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#1e291f] text-sm tracking-normal leading-[normal]"
                                                htmlFor={field.id}
                                            >
                                                {field.label}
                                            </label>
                                            <div className="flex items-center gap-2 px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg border border-solid border-[#dce3dd]">
                                                <div
                                                    className="relative w-4.5 h-4.5"
                                                    aria-hidden="true"
                                                >
                                                    <Image
                                                        className="absolute w-[93.06%] h-[93.06%] top-[6.94%] left-[6.94%]"
                                                        alt=""
                                                        src={field.icon}
                                                    />
                                                </div>
                                                <input
                                                    className="relative flex-1 -mt-px font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#556858] text-[15px] tracking-normal leading-[normal] [background:transparent] border-[none] p-0"
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
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
                            <button
                                className="flex items-center justify-center px-0 py-3.5 relative self-stretch w-full flex-[0_0_auto] bg-[#2d5a27] rounded-[10px] cursor-pointer"
                                type="submit"
                            >
                                <span className="relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-white text-base tracking-normal leading-[normal]">
                                    Salvar Alterações
                                </span>
                            </button>
                            <button
                                className="flex items-center justify-center px-0 py-3.25 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] border border-solid border-[#2d5a27] cursor-pointer"
                                type="button"
                                onClick={handleCancel}
                            >
                                <span className="relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#2d5a27] text-base tracking-normal leading-[normal]">
                                    Cancelar
                                </span>
                            </button>
                            <Image
                                className="relative self-stretch w-full h-px object-cover"
                                alt=""
                                aria-hidden="true"
                                src={line}
                            />
                            <div
                                className="inline-flex items-center gap-1.5 px-3 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md"
                                role="status"
                                aria-live="polite"
                            >
                                <div className="relative w-3.5 h-3.5">
                                    <Image
                                        className="absolute w-[98.81%] h-full top-0 left-0"
                                        alt=""
                                        aria-hidden="true"
                                        src={vector2}
                                    />
                                </div>
                                <div className="relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#2d5a27] text-xs tracking-normal leading-[normal]">
                                    {submitted
                                        ? "Alterações salvas com sucesso"
                                        : "Desperdício zero com NoWaste"}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default TelaEdicaoPerfil