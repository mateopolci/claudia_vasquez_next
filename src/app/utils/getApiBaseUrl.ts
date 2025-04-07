export function getApiBaseUrl(): string {
    return (
        process.env.NEXT_PUBLIC_API_URL || "https://claudiavasquezstrapi-production.up.railway.app/"
    );
}
