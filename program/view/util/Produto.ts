import {Box, Calendar, LucideIcon, Package, Tag} from "lucide-react";

export type ProductForm = {
    name: string;
    category: string;
    quantity: string;
    expirationDate: string;
};

export type Field = {
    id: keyof ProductForm;
    label: string;
    placeholder: string;
    icon: LucideIcon
    type?: string;
};

export const fieldRows: Field[][] = [
    [
        {
            id: "name",
            label: "Nome do produto",
            placeholder: "Ex: Leite Integral",
            icon: Box,
        },
        {
            id: "category",
            label: "Categoria",
            placeholder: "Ex: Laticínios",
            icon: Tag,
        },
    ],
    [
        {
            id: "quantity",
            label: "Quantidade",
            placeholder: "Ex: 2",
            icon: Package,
            type: "number",
        },
        {
            id: "expirationDate",
            label: "Data de validade",
            placeholder: "dd/mm/aaaa",
            icon: Calendar,
            type: "date",
        },
    ],
];

export const initialProduct: ProductForm = {
    name: "",
    category: "",
    quantity: "",
    expirationDate: "",
};
