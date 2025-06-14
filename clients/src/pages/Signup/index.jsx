import { Outlet, useLocation } from "react-router-dom";
import { register } from "../../assets";
import { cn } from "../../lib/utils";

const Signup = () => {
    const location = useLocation();
    const currentStep =
        location.pathname == "/onboard/complete-profile"
            ? 2
            : location.pathname == "/onboard/term-condition-check"
                ? 3
                : 1;

    return (
        <div className="min-h-screen w-full flex">
            <div className="flex-1 p-8 md:p-12">
                <div className="mb-8 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {currentStep === 1
                            ? "Create your account"
                            : currentStep === 2
                                ? "Tell us about yourself"
                                : "Almost there!"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        {currentStep === 1
                            ? "Join our community today"
                            : currentStep === 2
                                ? "Help us personalize your experience"
                                : "Complete your registration"}
                    </p>
                </div>

                <div className="flex justify-center mb-8">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center font-bold",
                                    currentStep >= step
                                        ? "bg-sky-600 dark:bg-golden text-white dark:text-black"
                                        : "bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-gray-300"
                                )}
                            >
                                {step}
                            </div>
                            {step < 3 && (
                                <div className={cn(
                                        "w-12 h-1",
                                        currentStep > step
                                            ? "bg-sky-600 dark:bg-golden"
                                            : "bg-gray-200 dark:bg-neutral-700"
                                    )}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
                <Outlet />
            </div>
            <div className="hidden md:flex bg-gradient-to-br from-sky-500 to-sky-700 dark:from-yellow-700 dark:to-yellow-900 flex-col justify-end h-[calc(100vh-80px)] sticky top-16">
                <div className="absolute inset-0 flex items-center justify-center opacity-90">
                    <img
                        src={register}
                        alt="Sign up illustration"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="relative z-10 flex flex-col text-white bg-gradient-to-t dark:from-neutral-950 dark:via-neutral-950/40 via-70% dark:to-transparent p-8">
                    <h3 className="text-2xl font-bold mb-2">Join our community</h3>
                    <p className="mb-6">Discover amazing content tailored just for you</p>
                    <div className="flex gap-2">
                        {[1, 2, 3].map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "w-3 h-3 rounded-full",
                                    currentStep === i + 1 ? "bg-white" : "bg-white/30"
                                )}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
