export const getFileNames = async () => {
    const baseUrl =  "http://127.0.0.1:8000/api/v1/file-management/"

    try {
        const res = await fetch(`${baseUrl}`, { 
            method: 'get',
        });
        
        const data = await res.json();

        if (!res.ok || data?.status?.code !== 200) {
            const errorMessage = data?.status?.message || 'Something went wrong!';
            throw new Error(errorMessage);
        }
        return {
            success: true,
            data: data.data
        };

    } catch (error) {
        return {
            success: false,
            error: error.message || 'Something went wrong',
        };
    }
}