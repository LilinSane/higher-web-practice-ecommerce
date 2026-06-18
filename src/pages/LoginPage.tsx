import {ShadowContainer} from "@/components/ui/base/containers/ShadowContainer.tsx";
import runnerImage from '@/assets/runner.png';
import {LoginForm} from "@/components/modules/login/LoginForm.tsx";
import {useNavigate} from "react-router-dom";

export function LoginPage() {
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center p-4">
            <div
                className="absolute inset-0 -z-10 bg-center bg-no-repeat hidden md:block"
                style={{backgroundImage: `url(${runnerImage})`, backgroundSize: '55%'}}

            />

            <ShadowContainer className="hidden md:block w-full max-w-md p-8 backdrop-blur-sm">
                <LoginForm/>
            </ShadowContainer>

            <div className="md:hidden w-full h-full flex flex-col justify-between py-6">
                <LoginForm onBack={() => navigate(-1)}/>
            </div>
        </div>
    );
}