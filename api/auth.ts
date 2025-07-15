import { BASE_URL } from "@/Constants/BASE_URL";
import { LOGIN } from "@/types/QUERIES";
import { useTokenStore } from "@/stores/useTokenStore";
import { TOKEN_NAME } from "@/Constants/TOKEN_NAME";
import { setCookie } from "cookies-next/client";

export const login = async ({
  setIsError,
  setIsLoading,
  setResponseMessage,
  setIsSuccess,
  username,
  password,
}: LOGIN) => {
  setIsLoading(true);
  setIsError(false);
  setResponseMessage("");
  setIsSuccess(false);

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setIsSuccess(true);
      setIsLoading(false);
      setCookie(TOKEN_NAME, data.access_token);
      useTokenStore.getState().refresh();
    } else {
      setIsError(true);
      setResponseMessage(
        data.detail && data.detail.length > 0
          ? data.detail
          : "Something tripped on our end."
      );
      setIsLoading(false);
    }
  } catch (err: any) {
    setIsError(true);
    setResponseMessage("Something tripped on our end.");
  } finally {
    setIsLoading(false);
  }
};
