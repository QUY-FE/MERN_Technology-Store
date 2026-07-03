export async function fetchData(endpoint: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.log("Fetch Err:",error)
        throw error;
    }
}