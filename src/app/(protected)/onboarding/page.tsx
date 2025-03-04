import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/OnboardingForm";
import { getUserOnboardingStatus } from "@/actions/users";

export default async function page() {
    const { isOnboarded } = await getUserOnboardingStatus();

    if (isOnboarded) {
        redirect("/dashboard");
    }

    return (
        <main>
            <OnboardingForm industries={industries} />
        </main>
    );
}
