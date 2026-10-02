import { PainelDeInventario } from "./PainelDeInventario";
import { CabecalhoNavegacao } from "./CabecalhoNavegacao";
import {JSX} from "react";

export const NowasteEstoque = (): JSX.Element => {
    return (
        <main className="flex min-h-screen flex-col bg-[#f7f9f6] text-[#1d2821]">
            <PainelDeInventario />
            <CabecalhoNavegacao />
        </main>
    );
};

export default NowasteEstoque;