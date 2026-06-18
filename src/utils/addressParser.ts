import type { Address } from "@/types";

export const parseAddressString = (addressString: string): Address => {
    const parts = addressString.split(',').map(part => part.trim());

    return {
        country: "Россия",
        city: "Москва",
        street: parts[0] || "",
        house: parts[1] || "",
        apartment: parts[2] ? parts[2].replace(/кв\.?\s*/i, '') : undefined,
    };
};