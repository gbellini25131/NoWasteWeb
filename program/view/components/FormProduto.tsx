import {fieldRows, ProductForm} from "@/util/Produto";
import {instrumentSans} from "@/util/Fonts";
import React from "react";

type FormProdutoProps = {
    handleChange : (event : React.ChangeEvent<HTMLInputElement>) => void,
    product : ProductForm
}

const FormProduto = ( {handleChange, product} : FormProdutoProps ) => (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto">
        {fieldRows.map((row, rowIndex) => (
            <div
                key={`field-row-${rowIndex}`}
                className="flex items-start gap-4 w-full max-sm:flex-col"
            >
                {row.map((field) => {
                    const Icon = field.icon;
                    return (
                        <div
                            className={`${instrumentSans.className} flex flex-col items-start gap-1.5 flex-1 w-full`}
                            key={field.id}
                        >
                            <label
                                className="font-semibold text-[#1e291f] text-sm tracking-normal leading-normal"
                                htmlFor={field.id}
                            >
                                {field.label}
                            </label>
                            <div className="flex items-center gap-2 px-4 h-12 w-full bg-white rounded-lg border border-solid border-[#dce3dd] focus-within:border-[#1e291f] transition-colors">
                                <div
                                    className="flex items-center justify-center w-5 h-5 text-[#556858] shrink-0"
                                    aria-hidden="true"
                                >
                                    <Icon className="w-5 h-5"/>
                                </div>
                                <input
                                    className="w-full min-w-0 flex-1 outline-none bg-transparent font-normal text-[#1e291f] text-[15px] tracking-normal leading-normal"
                                    id={field.id}
                                    name={field.id}
                                    type={field.type ?? "text"}
                                    value={product[field.id]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    aria-label={field.label}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        ))}
    </div>
)

export default FormProduto

