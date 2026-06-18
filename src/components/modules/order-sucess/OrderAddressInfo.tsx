import type { Address } from "@/types";

interface OrderAddressInfoProps {
    address?: Address;
    pickupAddress?: string;
    deliveryMethod: 'courier' | 'pickup_point';
}

export function OrderAddressInfo({ address, pickupAddress, deliveryMethod }: OrderAddressInfoProps) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-sm font-normal text-gray-500 mb-1">Доставка</h3>
                <div className="text-gray-700">
                    {deliveryMethod === 'courier' && address && (
                        <p className="font-medium text-black">
                            г. {address.city}, ул. {address.street}, д. {address.house}
                            {address.apartment && `, кв. ${address.apartment}`}
                        </p>
                    )}
                    {deliveryMethod === 'pickup_point' && (
                        <p className="font-medium text-black">
                            {pickupAddress}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-normal text-gray-500 mb-1">Дата доставки</h3>
                <p className="font-medium text-black">19 июня, 2026</p>
            </div>
        </div>
    );
}