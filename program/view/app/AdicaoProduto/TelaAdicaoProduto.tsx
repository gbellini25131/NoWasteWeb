import { FormEvent, JSX, useState } from "react";
import Image, { StaticImageData } from "next/image";
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

type ProductForm = {
    name: string;
    category: string;
    quantity: string;
    expirationDate: string;
    storageLocation: string;
    notes: string;
};

type Field = {
    id: keyof ProductForm;
    label: string;
    placeholder: string;
    icon: StaticImageData | string;
    type?: string;
};

const fieldRows: Field[][] = [
    [
        {
            id: "name",
            label: "Nome do produto",
            placeholder: "Ex: Leite Integral",
            icon: image,
        },
        {
            id: "category",
            label: "Categoria",
            placeholder: "Ex: Laticínios",
            icon: vector2,
        },
    ],
    [
        {
            id: "quantity",
            label: "Quantidade",
            placeholder: "Ex: 2 unidades",
            icon: vector3,
        },
        {
            id: "expirationDate",
            label: "Data de validade",
            placeholder: "dd/mm/aaaa",
            icon: vector4,
            type: "date",
        },
    ],
    [
        {
            id: "storageLocation",
            label: "Local de armazenamento",
            placeholder: "Ex: Geladeira",
            icon: vector5,
        },
        {
            id: "notes",
            label: "Observações",
            placeholder: "Ex: Comprado no mercado central",
            icon: vector6,
        },
    ],
];

const initialForm: ProductForm = {
    name: "",
    category: "",
    quantity: "",
    expirationDate: "",
    storageLocation: "",
    notes: "",
};

const TelaAdicaoProduto = (): JSX.Element => {
    const [form, setForm] = useState<ProductForm>(initialForm);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
    };

    const handleCancel = (): void => {
        setForm(initialForm);
    };

    return (
        <main className="flex min-h-256 flex-col items-center relative bg-[#f7f9f6]">
            <header className="flex justify-between px-20 py-6 self-stretch w-full bg-transparent items-center relative flex-[0_0_auto]">
                <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                    <div className="flex flex-col w-8 h-8 items-center justify-center relative bg-[#2d5a27] rounded-2xl">
                        <div className="relative w-4.5 h-4.5">
                            <Image
                                className="absolute w-[97.22%] h-full top-0 left-[2.78%]"
                                alt=""
                                aria-hidden="true"
                                src={vector}
                            />
                        </div>
                    </div>
                    <div className="relative w-fit font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-xl tracking-normal leading-[normal]">
                        NoWaste
                    </div>
                </div>
                <nav aria-label="Navegação principal">
                    <a
                        className="relative w-fit -mt-px font-['Instrument_Sans-Medium',Helvetica] font-medium text-[#556858] text-sm tracking-normal leading-[normal]"
                        href="https://nowaste-app.com"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Voltar a Home
                    </a>
                </nav>
            </header>
            <section className="flex flex-col h-219.75 items-center justify-center pt-5 pb-15 px-0 relative self-stretch w-full">
                <div className="flex flex-col w-160 max-w-full items-center justify-center relative flex-[0_0_auto]">
                    <Image
                        className="absolute -top-27.5 right-0 w-60 h-60 object-cover"
                        alt=""
                        aria-hidden="true"
                        src={leafAccentIllustration}
                    />
                    <div className="absolute left-[calc(50.00%-250px)] -bottom-10 w-125 h-20 bg-[#e8efe9] rounded-[250px/40px] blur-[20px] opacity-50" />
                    <form
                        className="flex flex-col w-145 max-w-[calc(100vw-2rem)] items-start gap-7 p-10 relative flex-[0_0_auto] bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710]"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <h1 className="relative self-stretch -mt-px font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-[32px] text-center tracking-normal leading-[normal]">
                                Adicionar Produto
                            </h1>
                            <p className="relative self-stretch font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#556858] text-[15px] text-center tracking-normal leading-[22.5px]">
                                Cadastre um novo produto no seu estoque
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                            {fieldRows.map((row, rowIndex) => (
                                <div
                                    className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto] max-sm:flex-col"
                                    key={`field-row-${rowIndex}`}
                                >
                                    {row.map((field) => (
                                        <div
                                            className="flex flex-col items-start gap-1.5 relative flex-1 grow max-sm:w-full"
                                            key={field.id}
                                        >
                                            <label
                                                className="relative self-stretch -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#1e291f] text-sm tracking-normal leading-[normal]"
                                                htmlFor={field.id}
                                            >
                                                {field.label}
                                            </label>
                                            <div className="flex items-center gap-2 px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg border border-solid border-[#dce3dd]">
                                                <div className="relative w-4.5 h-4.5 shrink-0">
                                                    <Image
                                                        className="absolute w-[75%] h-[75%] top-[12.5%] left-[12.5%] object-contain"
                                                        alt=""
                                                        aria-hidden="true"
                                                        src={field.icon}
                                                    />
                                                </div>
                                                <input
                                                    className="relative min-w-0 flex-1 -mt-px font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#1e291f] text-[15px] tracking-normal leading-[normal]"
                                                    id={field.id}
                                                    name={field.id}
                                                    type={field.type ?? "text"}
                                                    value={form[field.id]}
                                                    onChange={handleChange}
                                                    placeholder={field.placeholder}
                                                    aria-label={field.label}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
                            <button
                                className="flex items-center justify-center px-0 py-3.5 relative self-stretch w-full flex-[0_0_auto] bg-[#2d5a27] rounded-[10px] cursor-pointer hover:bg-[#23491f] focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                                type="submit"
                            >
                                <span className="relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-white text-base tracking-normal leading-[normal]">
                                    Adicionar ao Estoque
                                </span>
                            </button>
                            <button
                                className="flex items-center justify-center px-0 py-3.25 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] border border-solid border-[#2d5a27] cursor-pointer hover:bg-[#f1f6f1] focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
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
                            <div className="inline-flex items-center gap-1.5 px-3 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md">
                                <div className="relative w-3.5 h-3.5">
                                    <Image
                                        className="absolute w-[98.81%] h-full top-0 left-0"
                                        alt=""
                                        aria-hidden="true"
                                        src={vector7}
                                    />
                                </div>
                                <span className="relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#2d5a27] text-sm tracking-normal leading-[normal]">
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

export default TelaAdicaoProduto