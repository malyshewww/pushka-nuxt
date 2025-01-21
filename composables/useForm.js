const useForm = async (data) => {
  const tokenResponse = await fetch(
    `${useRuntimeConfig().public.apiBase}/session/token`,
    {
      method: "POST",
    }
  );
  if (!tokenResponse.ok) {
    throw new Error("Ошибка при получении токена");
  }
  const token = await tokenResponse.text();
  const formResponse = await fetch(
    `${useRuntimeConfig().public.apiBase}/webform_rest/submit?_format_json`,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
      },
      body: JSON.stringify(data),
    }
  );
  return {
    response: formResponse,
  };
};

export default useForm;
