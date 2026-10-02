import { JSX, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import image from "./image.svg";
import leafAccentIllustration from "./leaf-accent-illustration.png";
import line from "./line.svg";
import vector from "./vector.svg";
import vector2 from "./vector-2.svg";
import vector4 from "./vector-4.svg";
import vector5 from "./vector-5.svg";
import vector6 from "./vector-6.svg";

type ProductForm = {
    name: string;
    category: string;
    quantity: string;
    expirationDate: string;
    storageLocation: string;
    notes: string;
};

type FieldConfig = {
    id: keyof ProductForm;
    label: string;
    icon?: StaticImageData | string;
    backgroundIcon?: string;
    type?: string;
};

const initialProduct: ProductForm = {
    name: "Leite Integral",
    category: "Laticínios",
    quantity: "2 unidades",
    expirationDate: "15/09/2026",
    storageLocation: "Geladeira",
    notes: "Comprado no mercado central",
};

const fieldRows: FieldConfig[][] = [
    [
        {
            id: "name",
            label: "Nome do produto",
            icon: vector2,
        },
        {
            id: "category",
            label: "Categoria",
            backgroundIcon: "/vector-3.svg",
        },
    ],
    [
        {
            id: "quantity",
            label: "Quantidade",
            icon: vector4,
        },
        {
            id: "expirationDate",
            label: "Data de validade",
            icon: vector5,
            type: "text",
        },
    ],
    [
        {
            id: "storageLocation",
            label: "Local de armazenamento",
            icon: vector6,
        },
        {
            id: "notes",
            label: "Observações",
            backgroundIcon: "/vector-7.svg",
        },
    ],
];

const TelaEdicaoProduto = (): JSX.Element => {
    const [product, setProduct] = useState<ProductForm>(initialProduct);
    const [saved, setSaved] = useState(false);

    const handleChange = (id: keyof ProductForm, value: string) => {
        setProduct((currentProduct) => ({
            ...currentProduct,
            [id]: value,
        }));
        setSaved(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaved(true);
    };

    const handleDelete = () => {
        const confirmed = window.confirm(
            "Tem certeza de que deseja excluir este produto?",
        );

        if (confirmed) {
            setProduct({
                name: "",
                category: "",
                quantity: "",
                expirationDate: "",
                storageLocation: "",
                notes: "",
            });
            setSaved(false);
        }
    };

    return (
        <main className="flex min-h-256 flex-col items-center relative bg-[#f7f9f6]">
            <header className="flex justify-between px-20 py-6 self-stretch w-full bg-transparent items-center relative flex-[0_0_auto] max-sm:px-6">
                <Link
                    href="/"
                    aria-label="NoWaste - voltar para a página inicial"
                    className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
                >
                    <span className="flex flex-col w-8 h-8 items-center justify-center relative bg-[#2d5a27] rounded-2xl">
                        <span className="relative w-4.5 h-4.5">
                            <Image
                                className="absolute w-[97.22%] h-full top-0 left-[2.78%]"
                                alt=""
                                aria-hidden="true"
                                src={vector}
                            />
                        </span>
                    </span>
                    <span className="relative w-fit font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-xl tracking-normal leading-[normal]">
                        NoWaste
                    </span>
                </Link>
                <Link
                    href="/"
                    className="inline-flex gap-6 items-center relative flex-[0_0_auto] font-['Instrument_Sans-Medium',Helvetica] font-medium text-[#556858] text-sm tracking-normal leading-[normal] hover:text-[#2d5a27] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#2d5a27]"
                >
                    Voltar a Home
                </Link>
            </header>
            <section className="flex flex-col h-219.75 items-center justify-center pt-5 pb-15 px-0 relative self-stretch w-full max-sm:h-auto max-sm:min-h-219.75">
                <div className="flex flex-col w-160 items-center justify-center relative flex-[0_0_auto] max-sm:w-full max-sm:px-4">
                    <Image
                        className="absolute -top-27.5 right-0 w-60 h-60 object-cover max-sm:right-4"
                        alt=""
                        aria-hidden="true"
                        src={leafAccentIllustration}
                    />
                    <div className="absolute left-[calc(50.00%-250px)] -bottom-10 w-125 h-20 bg-[#e8efe9] rounded-[250px/40px] blur-[20px] opacity-50 max-sm:left-[8%] max-sm:w-[84%]" />
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col w-145 items-start gap-7 p-10 relative flex-[0_0_auto] bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710] max-sm:w-full max-sm:p-6"
                    >
                        <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <h1 className="relative self-stretch -mt-px font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-[32px] text-center tracking-normal leading-[normal]">
                                Editar Produto
                            </h1>
                            <p className="relative self-stretch font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#556858] text-[15px] text-center tracking-normal leading-[22.5px]">
                                Atualize as informações do seu produto
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                            {fieldRows.map((row, rowIndex) => (
                                <div
                                    key={`field-row-${rowIndex}`}
                                    className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto] max-sm:flex-col"
                                >
                                    {row.map((field) => (
                                        <div
                                            key={field.id}
                                            className="flex flex-col items-start gap-1.5 relative flex-1 grow max-sm:w-full"
                                        >
                                            <label
                                                htmlFor={field.id}
                                                className="relative self-stretch -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#1e291f] text-sm tracking-normal leading-[normal]"
                                            >
                                                {field.label}
                                            </label>
                                            <div className="flex items-center gap-2 px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg border border-solid border-[#dce3dd] focus-within:ring-2 focus-within:ring-[#2d5a27]/10">
                                                <span
                                                    className="relative w-4.5 h-4.5 shrink-0"
                                                    aria-hidden="true"
                                                >
                                                    {field.icon ? (
                                                        <span className="relative w-[75.00%] h-[75.00%] top-[12.50%] left-[12.50%] flex">
                                                            <Image
                                                                className="flex-1 w-[12.12px]"
                                                                alt=""
                                                                src={field.icon}
                                                            />
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className="relative block w-[75.00%] h-[75.00%] top-[12.50%] left-[12.50%] bg-position-[100%_100%]"
                                                            style={{
                                                                backgroundImage: `url(${field.backgroundIcon})`,
                                                            }}
                                                        />
                                                    )}
                                                </span>
                                                <input
                                                    id={field.id}
                                                    name={field.id}
                                                    type={field.type ?? "text"}
                                                    value={product[field.id]}
                                                    onChange={(event) =>
                                                        handleChange(field.id, event.target.value)
                                                    }
                                                    className={`relative flex-1 min-w-0 -mt-px font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#556858] text-[15px] tracking-normal leading-[normal] ${
                                                        field.id === "notes"
                                                            ? "overflow-hidden text-ellipsis"
                                                            : ""
                                                    }`}
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
                                type="submit"
                                className="flex items-center justify-center px-0 py-3.5 relative self-stretch w-full flex-[0_0_auto] bg-[#2d5a27] rounded-[10px] hover:bg-[#23491f] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2d5a27]"
                            >
                                <span className="relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-white text-base tracking-normal leading-[normal]">
                                    {saved ? "Alterações Salvas" : "Salvar Alterações"}
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex items-center justify-center px-0 py-3.25 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] border border-solid border-[#d32f2f] hover:bg-[#fff5f5] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#d32f2f]"
                            >
                                <span className="relative w-fit -mt-px font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#d32f2f] text-base tracking-normal leading-[normal]">
                                    Excluir Produto
                                </span>
                            </button>
                            <Image
                                className="relative self-stretch w-full h-px object-cover"
                                alt=""
                                aria-hidden="true"
                                src={line}
                            />
                            <div className="inline-flex items-center gap-1.5 px-3 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md">
                                <span className="relative w-3.5 h-3.5">
                                    <Image
                                        className="absolute w-[98.81%] h-full top-0 left-0"
                                        alt=""
                                        aria-hidden="true"
                                        src={image}
                                    />
                                </span>
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

export default TelaEdicaoProduto