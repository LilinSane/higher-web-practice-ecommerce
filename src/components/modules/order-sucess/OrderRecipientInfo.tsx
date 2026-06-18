import type { OrderCustomerInfo } from "@/types";

interface OrderRecipientInfoProps {
    customer: OrderCustomerInfo;
    comment?: string;
}

export function OrderRecipientInfo({ customer, comment }: OrderRecipientInfoProps) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="text-lg font-bold mb-3 text-black">Получатель</h3>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 text-sm text-gray-700">
                    <p className="font-medium text-black">
                        {customer.firstName} {customer.lastName}
                    </p>
                    <p>{customer.email}</p>
                    <p>{customer.phone}</p>
                </div>
            </div>

            <p className="text-sm">
                {comment || "Комментариев нет"}
            </p>
        </div>
    );
}