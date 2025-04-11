export function getApiBaseUrl(): string {
    return (
        //process.env.NEXT_PUBLIC_API_URL || "https://claudiavasquezstrapi-production.up.railway.app/"
        process.env.NEXT_PUBLIC_API_URL || "https://strapi-production-5a0a.up.railway.app/"
    );
}
