import { JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import vector15 from "./vector-15.svg";

export const CabecalhoNavegacao = (): JSX.Element => {
    return (
        <header className="flex justify-between px-20 py-6 self-stretch w-full bg-transparent items-center relative flex-[0_0_auto]">
            <Link
                href="/"
                aria-label="NoWaste - voltar para a página inicial"
                className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
            >
                <span className="flex flex-col w-8 h-8 items-center justify-center relative bg-[#2d5a27] rounded-2xl">
                    <span className="relative w-4.5 h-4.5">
                        <Image
                            className="absolute w-[97.23%] h-full top-0 left-[2.77%]"
                            src={vector15}
                            alt=""
                            aria-hidden="true"
                        />
                    </span>
                </span>
                <span className="relative w-fit font-['Fraunces-Bold',Helvetica] font-bold text-[#1e291f] text-xl tracking-normal leading-[normal]">
                    NoWaste
                </span>
            </Link>
            <nav
                aria-label="Navegação principal"
                className="inline-flex gap-6 items-center relative flex-[0_0_auto]"
            >
                <Link
                    href="/"
                    className="relative w-fit -mt-px font-['Instrument_Sans-Medium',Helvetica] font-medium text-[#556858] text-sm tracking-normal leading-[normal]"
                >
                    Voltar a Home
                </Link>
            </nav>
        </header>
    );
};
