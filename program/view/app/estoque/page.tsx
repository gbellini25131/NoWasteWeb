import Cabecalho from "@/components/Cabecalho";
import PainelDeInventario from "@/app/estoque/components/PainelDeInventario";

const TelaEstoque = () => {
    return (
        <main className="flex min-h-screen flex-col bg-[#f7f9f6] text-[#1d2821]">
            <Cabecalho onClickUrl="/navegacao" onClickScreen="à Tela Principal" ehInicio={false}/>
            <PainelDeInventario />
        </main>
    );
};

export default TelaEstoque;