import { QUERY_TYPES } from "@/types/QUERIES";
import { useTokenStore } from "@/stores/useTokenStore";
import { BASE_URL } from "@/Constants/BASE_URL";

interface STATS extends QUERY_TYPES {
    setData: (data: any)=> void
}

export const getStats = async ({
  setIsLoading,
  setIsError,
  setResponseMessage,
  setData,
}: STATS) => {
  setIsLoading(true);
  setIsError(false);
  setResponseMessage("");

  const token = useTokenStore.getState().token;

  let endpoint = `${BASE_URL}/dashboard/stats`;

 
  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const data = await response.json();

    if (response.status == 200) {
      setData(data);
    } else {
      setIsError(true);
      setResponseMessage(data.detail);
    }
  } catch (error: any) {
    setIsError(true);
    setResponseMessage("Something tripped on our end.");
  } finally {
    setIsLoading(false);
  }
};
