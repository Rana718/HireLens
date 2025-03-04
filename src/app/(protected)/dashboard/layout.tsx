import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-4">
            
            <Suspense
                fallback={<BarLoader className="" width={"100%"} color="gray" />}
            >
                {children}
            </Suspense>
        </div>
    );
}
