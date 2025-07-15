import { GET_CLASSES } from "@/types/QUERIES";
import { useTokenStore } from "@/stores/useTokenStore";
import { BASE_URL } from "@/Constants/BASE_URL";


export const getSubjects = async ({
    setIsLoading,
    setIsError,
    setResponseMessage,
    setData,
    academic_year,
    include_performance,
    is_active,
  }: GET_CLASSES) => {
    setIsLoading(true);
    setIsError(false);
    setResponseMessage("");
  
    const token = useTokenStore.getState().token;
  
    let endpoint = `${BASE_URL}/academics/subjects`;
  
    const params = new URLSearchParams();
  
    if (academic_year) params.append("search", academic_year);
    endpoint += `?${params.toString()}`;
  
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
  