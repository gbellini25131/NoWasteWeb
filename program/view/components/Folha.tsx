import folha from "@/public/folha.png";
import Image from "next/image";

const Folha = () => (
    <Image
        className="absolute -top-35 right-0 w-60 h-60 object-cover"
        alt="Ilustração de folhas"
        src={folha}
    />
)
export default Folha