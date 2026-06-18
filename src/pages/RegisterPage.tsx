import { ShadowContainer } from "@/components/ui/base/containers/ShadowContainer.tsx";
import runnerImage from '@/assets/runner.png';
import {RegisterForm} from "@/components/modules/register/RegisterForm.tsx";
import {useNavigate} from "react-router-dom";

export function RegisterPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative">
            <div
                className="absolute inset-0 -z-10 bg-center bg-no-repeat hidden md:block"
                style={{backgroundImage: `url(${runnerImage})`, backgroundSize: '55%'}}
            />

            <ShadowContainer className="hidden md:block w-full max-w-md p-8 backdrop-blur-sm bg-white/90">
                <RegisterForm/>
            </ShadowContainer>

            <div className="md:hidden w-full h-full flex flex-col justify-between py-6">
                <RegisterForm onBack={() => navigate(-1)}/>
            </div>
        </div>
    );
}