import { NEW_REPORT } from "@/types/QUERIES";
import { useTokenStore } from "@/stores/useTokenStore";
import { BASE_URL } from "@/Constants/BASE_URL";

export const submitReport = async ({
  setIsError,
  setIsLoading,
  setResponseMessage,
  setIsSuccess,
  absent_days,
  academic_year,
  present_days,
  remarks,
  subject_scores,
  term_type,
  standard,
  student_id,
}: NEW_REPORT) => {
  setIsLoading(true);
  setIsError(false);
  setResponseMessage("");
  setIsSuccess(false);

  const token = useTokenStore.getState().token;

  try {
    const response = await fetch(`${BASE_URL}/predictions/predict`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        absent_days,
        academic_year,
        present_days,
        remarks,
        subject_scores,
        term_type,
        standard,
        student_id,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setIsSuccess(true);
      window.setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        params.delete("report");
      }, 1000);
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
