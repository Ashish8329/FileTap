export const processTextFile = async (file_name) => {
    const baseUrl =  "http://127.0.0.1:8000/api/v1/file-management/"

    try {
        const res = await fetch(`${baseUrl}check-file?file_name=${file_name}.txt`, { 
            method: 'get',
        });
        
        const data = await res.json();

        if (!res.ok || data?.status?.code !== 200) {
            const errorMessage = data?.status?.message || 'Something went wrong!';
            throw new Error(errorMessage);
        }
        return {
            success: true,
            data: data.data,
            message: data.status.message
        };

    } catch (error) {
        return {
            success: false,
            error: error.message || 'Something went wrong',
        };
    }
}