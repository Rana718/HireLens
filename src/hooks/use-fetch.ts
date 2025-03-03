import { useState } from "react";
import { toast } from "sonner";

type FetchCallback<T, A extends any[]> = (...args: A) => Promise<T>;

function useFetch<T, A extends any[]>(cb: FetchCallback<T, A>) {
    const [data, setData] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fn = async (...args: A) => {
        setLoading(true);
        setError(null);

        try {
            const response = await cb(...args);
            setData(response);
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fn, setData };
}

export default useFetch;
