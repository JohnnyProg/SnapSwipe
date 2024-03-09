import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number): {debouncedValue: T, isWaiting: boolean} {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);
    
    return {debouncedValue, isWaiting: debouncedValue !== value};
}