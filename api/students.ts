import { CREATE_STUDENT, GET_STUDENTS } from "@/types/QUERIES";
import { useTokenStore } from "@/stores/useTokenStore";
import { BASE_URL } from "@/Constants/BASE_URL";

export const getRecentStudents = async ({
  setIsLoading,
  setIsError,
  setResponseMessage,
  setData,
  limit,
}: GET_STUDENTS) => {
  setIsLoading(true);
  setIsError(false);
  setResponseMessage("");

  const token = useTokenStore.getState().token;

  let endpoint = `${BASE_URL}/dashboard/students/recent?limit=${limit}`;

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

export const getRiskDistribution = async ({
  setIsLoading,
  setIsError,
  setResponseMessage,
  setData,
}: GET_STUDENTS) => {
  setIsLoading(true);
  setIsError(false);
  setResponseMessage("");

  const token = useTokenStore.getState().token;

  let endpoint = `${BASE_URL}/dashboard/risk-distribution`;

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

export const getStudentAssessment = async ({
  setIsLoading,
  setIsError,
  setResponseMessage,
  setData,
  id,
}: GET_STUDENTS) => {
  setIsLoading(true);
  setIsError(false);
  setResponseMessage("");

  const token = useTokenStore.getState().token;

  let endpoint = `${BASE_URL}/predictions/student/${id}`;

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

export const getStudentById = async ({
  setIsLoading,
  setIsError,
  setResponseMessage,
  setData,
  id,
}: GET_STUDENTS) => {
  setIsLoading(true);
  setIsError(false);
  setResponseMessage("");

  const token = useTokenStore.getState().token;

  let endpoint = `${BASE_URL}/students/${id}`;

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

export const getStudentGuardian = async ({
  setIsLoading,
  setIsError,
  setResponseMessage,
  setData,
  id,
}: GET_STUDENTS) => {
  setIsLoading(true);
  setIsError(false);
  setResponseMessage("");

  const token = useTokenStore.getState().token;

  let endpoint = `${BASE_URL}/students/${id}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const data = await response.json();

    if (response.status == 200) {
      setData(data.guardian);
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

export const createStudent = async ({
  setIsError,
  setIsLoading,
  setResponseMessage,
  setIsSuccess,
  first_name,
  last_name,
  class_id,
  class_repetitions,
  date_of_birth,
  distance_to_school,
  enrollment_date,
  gender,
  guardian_id,
  home_address,
  household_income,
  special_learning,
  student_id,
  textbook_availability,
  transport_method,
}: CREATE_STUDENT) => {
  setIsLoading(true);
  setIsError(false);
  setResponseMessage("");
  setIsSuccess(false);

  const token = useTokenStore.getState().token;

  try {
    const response = await fetch(`${BASE_URL}/students/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        class_id,
        class_repetitions,
        date_of_birth,
        distance_to_school,
        enrollment_date,
        gender,
        guardian_id,
        home_address,
        household_income,
        special_learning,
        student_id,
        textbook_availability,
        transport_method,
      }),
    });

    const data = await response.json();

    if (response.status === 201) {
      setIsSuccess(true);
      window.setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        params.delete("add-student");
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
