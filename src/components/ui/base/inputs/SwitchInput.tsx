import { Switch } from '@headlessui/react';

interface SwitchItemProps {
    label: string;
    checked: boolean;
    onChange: () => void;
}

export function SwitchInput({ label, checked, onChange }: SwitchItemProps) {
    return (
        <div className="flex items-center justify-between py-2">
            <Switch
                checked={checked}
                onChange={onChange}
                className={`${
                    checked ? 'bg-blue-600' : 'bg-[#9CA3AF]'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
                <span
                    className={`${
                        checked ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
            </Switch>
            <span className="text-sm">{label}</span>
        </div>
    );
}