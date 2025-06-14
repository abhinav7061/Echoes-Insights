import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Inputs";
import { RadioGroup } from "../../components/Inputs/radioGroup";
import { SimpleCheckbox } from "../../components/Inputs/simpleInputs";
import { Step2Schema } from "../../schemas/signup";
import Error from "../../components/Inputs/error";
import ProfilePictureUpdates from "../../components/ProfileImageUpload";
import Label from "../../components/Inputs/label";
import { toast } from "sonner";
import useApi from "../../hooks/useApi";

const interests = [
    "Technology",
    "Science",
    "Health",
    "Business",
    "Entertainment",
    "Sports",
    "Politics",
    "Travel",
    "Food",
    "Art",
    "Education",
    "Fashion",
];

export default function SignupStep2() {
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
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(Step2Schema),
        defaultValues: {
            phone: '',
            interests: [],
        },
    });

    const selectedInterests = watch("interests") || [];

    const toggleInterest = (value) => {
        const current = watch("interests") || [];
        const newValues = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];

        setValue("interests", newValues, { shouldValidate: true });
    };

    const onSubmit = async (data) => {
        const res = await callApi({ method: 'PATCH', data });
        if (res.error) {
          return toast.error("Error completing profile");
        }
        toast.success("Profile Completed! One more step to move head.");
        navigate("/onboard/term-condition-check");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input name="phone" type="tel" label="Phone Number" control={control} />
            <RadioGroup
                name="gender"
                label="Gender"
                control={control}
                className="flex gap-1 flex-col"
                radiosClass="flex gap-2 flex-wrap"
                options={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Other", value: "Other" },
                    { label: "Prefer not to say", value: "Undisclosed" },
                ]}
            />
            <ProfilePictureUpdates className="xs:flex-row gap-6 justify-center items-center" />
            <Label label="Select Interests" required />
            <div className="flex flex-wrap gap-2 gap-x-4">
                {interests.map((interest) => (
                    <span
                        className="flex items-center cursor-pointer"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                    >
                        <SimpleCheckbox
                            id={interest}
                            label={interest}
                            checked={selectedInterests.includes(interest)}
                            onChange={() => { }}
                        />
                        <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                            {interest}
                        </span>
                    </span>
                ))}
            </div>
            <Error showError={errors.interests} error={errors.interests} />

            <Button
                className="rounded-lg w-full p-2"
                title="Next"
                type="submit"
                disabled={isSubmitting}
            />
        </form>
    );
}