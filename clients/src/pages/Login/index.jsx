import Button from '../../components/Button';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUserAuthentication } from '../../context/userContext';
import { toast } from 'sonner';
import { login } from '../../assets';
import OAuth from '../../components/OAuth';
import Input from '../../components/Inputs';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../../components/Inputs/checkbox';
import loginSchema from '../../schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePost } from '../../hooks/usePost';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login: loginUser } = useUserAuthentication();
    const { post, loading } = usePost("/user/login");
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember_me: false,
        },
    });

    const onSubmit = async (data) => {
        const res = await post(data);
        if (res.error)
            return toast.error(res?.error || "Server Error while logging in!");
        loginUser(res.user, res.jwtToken);
        if (!res.user?.interests || res.user?.interests?.length === 0) {
            toast.warning(`Welcome back ${res.user.name}! Complete your profile to get personalized content.`);
            return navigate("/onboard/complete-profile");
        }
        if (!res.user.termsAccepted) {
            toast.warning(`Welcome back ${res.user.name}! Please accept the terms and conditions to continue.`);
            return navigate("/onboard/term-condition-check");
        }
        toast.success(`Welcome back ${res.user.name}! Continue exploring your interests.`);
        navigate(location.state?.redirect || "/");
    }
    return (
        <div className="min-h-screen w-full flex">
            <div className="flex-1 p-8 md:p-12 flex flex-col">
                <div className="mb-8 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Sign in to account</h2>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                        Donot have account then click here <NavLink to='/onboard' className={`text-blue hover:underline dark:text-golden`}>Signup</NavLink>
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input name="email" control={control} label="Email address:" type="email" required />
                    <Input name="password" control={control} label="Password:" type="password" required />
                    <div className="flex w-full justify-between pb-2 mb-2 text-neutral-800 text-sm dark:text-neutral-300">
                        <Checkbox name='remember_me' label='Remember me' control={control} />
                        <NavLink to='/forgot-password' className="dark:hover:text-golden hover:text-blue hover:underline">
                            Forgot password?
                        </NavLink>
                    </div>
                    <Button className="w-full py-2 sm:py-3 px-4 rounded-lg font-bold" title={loading ? "Logging in..." : "Login"} type="submit" disabled={loading} />
                </form>
                <OAuth />
            </div>

            <div className="hidden md:flex bg-gradient-to-br from-sky-500 to-sky-700 dark:from-yellow-700 dark:to-yellow-900 flex-col justify-end h-[calc(100vh-80px)] sticky top-16">
                <div className="absolute inset-0 flex items-center justify-center opacity-90">
                    <img
                        src={login}
                        alt="Sign up illustration"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="relative z-10 flex flex-col text-white bg-gradient-to-t dark:from-neutral-950 dark:via-neutral-950/40 via-70% dark:to-transparent p-8">
                    <h3 className="text-2xl font-bold mb-2">Glad you’re back!</h3>
                    <p className="mb-6">Continue discovering new ideas tailored just for you.</p>
                </div>
            </div>
        </div>
    )
}

export default Login