import { NEW_PREDICTIONS } from "@/types/QUERIES";
import { useTokenStore } from "@/stores/useTokenStore";
import { BASE_URL } from "@/Constants/BASE_URL";

export const newPrediction = async ({
  setIsError,
  setIsLoading,
  setResponseMessage,
  setIsSuccess,
  age,
  bullying_incidents_total,
  class_repetitions,
  distance_to_school,
  gender,
  household_income,
  orphan_status,
  school_attendance_rate,
  special_learning,
  standard,
  student_id,
  term_avg_score,
}: NEW_PREDICTIONS) => {
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
        age,
        bullying_incidents_total,
        class_repetitions,
        distance_to_school,
        gender,
        household_income,
        orphan_status,
        school_attendance_rate,
        special_learning,
        standard,
        student_id,
        term_avg_score,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setIsSuccess(true);
      window.setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        params.delete("new-assesment");
        params.set("student", student_id);
        history.pushState(null, "", `?student=${student_id}`);
        const newSearch = params.toString();
        const newUrl = newSearch ? `?${newSearch}` : window.location.pathname;
        history.pushState(null, "", newUrl);
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
