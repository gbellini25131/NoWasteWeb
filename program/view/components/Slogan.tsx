import {Leaf} from "lucide-react";
import {instrumentSans} from "@/util/Fonts";

const Slogan = () => (
    <div className="inline-flex items-center gap-1.5 px-3 py-2 relative flex-[0_0_auto] bg-[#e8efe9] rounded-md">
        <Leaf className="w-3.5 h-3.5 text-[#2d5a27]" />
        <span className={`${instrumentSans.className} relative w-fit -mt-px font-semibold text-[#2d5a27] text-[13px] tracking-normal leading-[normal]`}>
                                    Desperdício zero com NoWaste
                                </span>
    </div>
)

export default Slogan