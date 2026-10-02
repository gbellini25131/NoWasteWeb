import { FormEvent, JSX, useState } from "react";
import Image, { StaticImageData } from "next/image";
import image from "./image.svg";
import leafAccentIllustration from "./leaf-accent-illustration.png";
import line from "./line.svg";
import line2 from "./line-2.svg";
import line3 from "./line-3.svg";
import line4 from "./line-4.svg";
import line5 from "./line-5.svg";
import line6 from "./line-6.svg";
import vector from "./vector.svg";
import vector2 from "./vector-2.svg";
import vector3 from "./vector-3.svg";
import vector4 from "./vector-4.svg";
import vector5 from "./vector-5.svg";
import vector6 from "./vector-6.svg";
import vector7 from "./vector-7.svg";
import vector8 from "./vector-8.svg";
import vector9 from "./vector-9.svg";
import vector10 from "./vector-10.svg";
import vector11 from "./vector-11.svg";
import vector12 from "./vector-12.svg";
import vector13 from "./vector-13.svg";
import vector14 from "./vector-14.svg";

type InventoryItem = {
    id: number;
    name: string;
    expiration: string;
    category: string;
    icon: StaticImageData | string;
    iconBackground: string;
    status: "Vence em breve" | "Dentro da validade";
    divider: StaticImageData | string;
};

const initialInventory: InventoryItem[] = [
    {
        id: 1,
        name: "Leite Integral",
        expiration: "31/08/2026",
        category: "Laticínios",
        icon: vector3,
        iconBackground: "bg-[#e3f2fd]",
        status: "Vence em breve",
        divider: line3,
    },
    {
        id: 2,
        name: "Queijo Mussarela",
        expiration: "03/09/2026",
        category: "Laticínios",
        icon: vector14,
        iconBackground: "bg-[#fffde7]",
        status: "Vence em breve",
        divider: line4,
    },
    {
        id: 3,
        name: "Iogurte Natural",
        expiration: "15/09/2026",
        category: "Laticínios",
        icon: vector6,
        iconBackground: "bg-[#f3e5f5]",
        status: "Dentro da validade",
        divider: line5,
    },
    {
        id: 4,
        name: "Peito de Frango",
        expiration: "29/08/2026",
        category: "Carnes",
        icon: vector13,
        iconBackground: "bg-[#ffebee]",
        status: "Vence em breve",
        divider: line6,
    },
    {
        id: 5,
        name: "Tomate Cereja",
        expiration: "10/09/2026",
        category: "Hortifruti",
        icon: vector9,
        iconBackground: "bg-[#e8f5e9]",
        status: "Dentro da validade",
        divider: line,
    },
    {
        id: 6,
        name: "Manteiga Aviação",
        expiration: "20/09/2026",
        category: "Laticínios",
        icon: vector11,
        iconBackground: "bg-[#fff8e1]",
        status: "Dentro da validade",
        divider: image,
    },
];

const deleteIcons = [vector4, vector5, vector7, vector8, vector10, vector12];

export const PainelDeInventario = (): JSX.Element => {
    const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [expiration, setExpiration] = useState("");
    const [category, setCategory] = useState("");

    const removeProduct = (id: number) => {
        setInventory((items) => items.filter((item) => item.id !== id));
    };

    const addProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!productName.trim() || !expiration || !category.trim()) {
            return;
        }
        setInventory((items) => [
            ...items,
            {
                id: Date.now(),
                name: productName.trim(),
                expiration,
                category: category.trim(),
                icon: vector3,
                iconBackground: "bg-[#e3f2fd]",
                status: "Dentro da validade",
                divider: line3,
            },
        ]);
        setProductName("");
        setExpiration("");
        setCategory("");
        setIsModalOpen(false);
    };

    return (
        <>
            <section className="flex flex-col items-center justify-center pt-10 pb-15 px-0 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col w-280 max-w-full items-center justify-center relative flex-[0_0_auto]">
                    <Image
                        className="absolute -top-30 right-0 w-60 h-55 object-cover"
                        alt="Ilustração decorativa de folhas"
                        src={leafAccentIllustration}
                    />
                    <div className="absolute left-[calc(50.00%-490px)] -bottom-10 w-245 h-20 bg-[#e8efe9] rounded-[490px/40px] blur-[20px] opacity-50" />

                    <div className="flex flex-col items-start gap-10 p-12 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-3xl shadow-[0px_16px_32px_#2d5a2710]">
                        <header className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex flex-col items-start gap-2 relative flex-1 grow">
                                <h1 className="relative self-stretch -mt-px font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-4xl tracking-normal leading-[normal]">
                                    Meu Estoque
                                </h1>
                                <p className="font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#556858] text-base">
                                    Gerencie seus produtos e fique de olho nas validades
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center gap-2 px-5 py-3 relative flex-[0_0_auto] bg-[#2d5a27] rounded-lg hover:bg-[#23491f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                                aria-label="Adicionar novo produto"
                            >
                                <span className="w-4 h-4 flex flex-col items-center justify-center relative">
                                    <span className="relative w-4 h-4">
                                        <Image
                                            className="absolute w-[85.42%] h-[85.42%] top-[14.58%] left-[14.58%]"
                                            alt=""
                                            aria-hidden="true"
                                            src={vector2}
                                        />
                                    </span>
                                </span>
                                <span className="font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-white text-[15px] whitespace-nowrap">
                                    Adicionar Produto
                                </span>
                            </button>
                        </header>

                        <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="grid grid-cols-3 items-start gap-6 relative self-stretch w-full">
                                {inventory.map((item, index) => (
                                    <article
                                        key={item.id}
                                        className="gap-5 p-6 flex-1 grow bg-white rounded-2xl border border-solid border-[#dce3dd] flex flex-col items-start relative min-w-0"
                                    >
                                        <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                                            <div
                                                className={`flex flex-col w-12 h-12 items-center justify-center relative rounded-3xl ${item.iconBackground}`}
                                            >
                                                <div className="flex flex-col w-6 h-6 items-center justify-center relative">
                                                    <div className="relative w-6 h-6">
                                                        <Image
                                                            className="absolute inset-0 w-full h-full object-contain"
                                                            alt=""
                                                            aria-hidden="true"
                                                            src={item.icon}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <span
                                                className={`inline-flex items-start px-3 py-1.5 relative flex-[0_0_auto] rounded-[20px] font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-xs ${
                                                    item.status === "Vence em breve"
                                                        ? "bg-[#fff3e0] text-[#e65100]"
                                                        : "bg-[#e8efe9] text-[#2d5a27]"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>

                                        <div className="gap-1.5 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative">
                                            <h2 className="font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-lg">
                                                {item.name}
                                            </h2>
                                            <p className="font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#556858] text-sm">
                                                Validade:{" "}
                                                <time
                                                    className={`font-['Instrument_Sans-SemiBold',Helvetica] font-semibold ${
                                                        item.status === "Vence em breve"
                                                            ? "text-[#e65100]"
                                                            : "text-[#1e291f]"
                                                    }`}
                                                >
                                                    {item.expiration}
                                                </time>
                                            </p>
                                        </div>

                                        <Image
                                            className="relative self-stretch w-full h-px object-cover"
                                            alt=""
                                            aria-hidden="true"
                                            src={item.divider}
                                        />

                                        <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                                            <span className="font-['Instrument_Sans-Regular',Helvetica] font-normal text-[#556858] text-[13px]">
                                                {item.category}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeProduct(item.id)}
                                                className="inline-flex items-center gap-1 relative flex-[0_0_auto] text-[#d32f2f] hover:text-[#a92323] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d32f2f] focus-visible:ring-offset-2 rounded"
                                                aria-label={`Excluir ${item.name}`}
                                            >
                                                <span className="w-3.5 h-3.5 flex flex-col items-center justify-center relative">
                                                    <span className="relative w-3.5 h-3.5">
                                                        <Image
                                                            className="absolute w-[94.64%] h-[98.81%] top-0 left-[5.36%]"
                                                            alt=""
                                                            aria-hidden="true"
                                                            src={
                                                                deleteIcons[
                                                                index % deleteIcons.length
                                                                    ]
                                                            }
                                                        />
                                                    </span>
                                                </span>
                                                <span className="font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-sm">
                                                    Excluir
                                                </span>
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <footer className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <Image
                                className="-mt-px relative self-stretch w-full h-px object-cover"
                                alt=""
                                aria-hidden="true"
                                src={line2}
                            />
                            <div className="inline-flex items-center gap-2 px-4 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md">
                                <div className="relative w-3.5 h-3.5">
                                    <Image
                                        className="absolute w-[98.81%] h-full top-0 left-0"
                                        alt=""
                                        aria-hidden="true"
                                        src={vector}
                                    />
                                </div>
                                <span className="font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-[#2d5a27] text-sm">
                                    Desperdício zero com NoWaste
                                </span>
                            </div>
                        </footer>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e291f]/40 p-6"
                    role="presentation"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setIsModalOpen(false);
                        }
                    }}
                >
                    <form
                        onSubmit={addProduct}
                        className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white p-8 shadow-2xl"
                        aria-labelledby="add-product-title"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <h2
                                id="add-product-title"
                                className="font-['Fraunces-Bold',Helvetica] text-2xl font-bold text-[#1e291f]"
                            >
                                Adicionar Produto
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="text-2xl leading-none text-[#556858] hover:text-[#1e291f]"
                                aria-label="Fechar formulário"
                            >
                                ×
                            </button>
                        </div>

                        <label className="flex flex-col gap-2 font-['Instrument_Sans-Regular',Helvetica] text-sm text-[#1e291f]">
                            Nome do produto
                            <input
                                required
                                value={productName}
                                onChange={(event) => setProductName(event.target.value)}
                                className="rounded-lg border border-[#dce3dd] px-3 py-2 outline-none focus:ring-2 focus:ring-[#e8efe9]"
                            />
                        </label>

                        <label className="flex flex-col gap-2 font-['Instrument_Sans-Regular',Helvetica] text-sm text-[#1e291f]">
                            Validade
                            <input
                                required
                                type="date"
                                value={expiration}
                                onChange={(event) => setExpiration(event.target.value)}
                                className="rounded-lg border border-[#dce3dd] px-3 py-2 outline-none focus:ring-2 focus:ring-[#e8efe9]"
                            />
                        </label>

                        <label className="flex flex-col gap-2 font-['Instrument_Sans-Regular',Helvetica] text-sm text-[#1e291f]">
                            Categoria
                            <input
                                required
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                                className="rounded-lg border border-[#dce3dd] px-3 py-2 outline-none focus:ring-2 focus:ring-[#e8efe9]"
                            />
                        </label>

                        <button
                            type="submit"
                            className="rounded-lg bg-[#2d5a27] px-5 py-3 font-['Instrument_Sans-SemiBold',Helvetica] font-semibold text-white hover:bg-[#23491f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2"
                        >
                            Salvar Produto
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};