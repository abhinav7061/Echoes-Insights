import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Button from '../../components/Button';
import { Checkbox } from '../../components/Inputs/checkbox';
import { Step3Schema } from "../../schemas/signup";
import useApi from "../../hooks/useApi";
import { toast } from "sonner";

export default function SignupStep3() {
    const navigate = useNavigate();
    const { callApi, loading: isSubmitting } = useApi(
        "/user/update-profile",
        {},
        false,
        true
    );
    const {
        handleSubmit,
        control,
    } = useForm({
        resolver: zodResolver(Step3Schema),
        defaultValues: {
            reciveUpdates: false,
            termsAccepted: true,
        },
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        const res = await callApi({ method: 'PATCH', data });
        if (res.error)
            return toast.error("Error completing profile");
        toast.success("All Done!");
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Checkbox name="reciveUpdates" label="Receive email updates" control={control} />
            <Checkbox
                name="termsAccepted"
                label={
                    <span>
                        I agree to the <a href="/terms" className="underline text-blue">Terms</a> and <a href="/privacy" className="underline text-blue">Privacy Policy</a>
                    </span>
                }
                control={control}
                required
            />

            <Button className='rounded-lg w-full p-2' title="Finish" type="submit" disabled={isSubmitting} />
        </form>
    );
}
