import Link from "next/link";
import {Leaf} from "lucide-react";
import {fraunces, instrumentSans} from "@/util/Fonts";

type CabecalhoProps = {
    onClickUrl : string,
    onClickScreen :  string,
    ehInicio : boolean,
}

const Cabecalho = ( { onClickUrl, onClickScreen, ehInicio } : CabecalhoProps) => (
    <header className="flex justify-between px-20 py-6 self-stretch w-full bg-transparent items-center relative flex-[0_0_auto]">
        <Link
            className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
            href="/inicio"
            aria-label="NoWaste página inicial"
        >
            <span className="flex w-8 h-8 items-center justify-center shrink-0 bg-[#2d5a27] rounded-2xl">
                <Leaf className="w-4 h-4 text-white shrink-0" />
            </span>
            <span className={`${fraunces.className} relative w-fit font-bold text-[#1e291f] text-xl tracking-normal leading-[normal] `}>
                NoWaste
            </span>
        </Link>
        {
            !ehInicio ?
                <nav aria-label="Navegação principal">
                    <Link
                        className={`${instrumentSans.className} inline-flex gap-6 items-center relative flex-[0_0_auto] font-medium text-[#556858] text-sm tracking-normal leading-[normal] hover:text-[#2d5a27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a27] focus-visible:ring-offset-2`}
                        href={onClickUrl}
                    >
                        Voltar {onClickScreen}
                    </Link>
                </nav>
                : null
        }
    </header>
)

export default Cabecalho;