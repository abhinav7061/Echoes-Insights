import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Inputs";
import { Step1Schema } from "../../schemas/signup";
import OAuth from "../../components/OAuth";
import { usePost } from "../../hooks/usePost";
import { toast } from "sonner";

const SignupStep1 = () => {
    const navigate = useNavigate();
    const { post: registerUser, loading: isSubmitting } = usePost("/user/register");

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(Step1Schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            cpassword: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        const response = await registerUser(data);
        console.log(response);
        if (response.error) {
            return toast.error(response?.error || "Server Error");
        }
        navigate("/onboard/profile-completion");
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input name="name" label="Full Name" control={control} required />
                <Input name="email" label="Email" control={control} type="email" required />
                <Input name="password" label="Password" control={control} type="password" required />
                <Input name="cpassword" label="Confirm Password" control={control} type="password" required />
                <Button className="rounded-lg w-full p-2" style={{ marginTop: "20px" }} title="Create Account" type="submit" disabled={isSubmitting} />
            </form>
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <NavLink
                    to="/login"
                    className="text-blue dark:text-golden font-medium hover:underline"
                >
                    Log in
                </NavLink>
            </div>
            <OAuth />
        </>
    );
};

export default SignupStep1;
