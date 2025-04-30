import { setCookie } from "lib/apicalls"

export function useLogin() {
  const login = (key: string) => {
    console.log("Received API Key:", key);
    // Weiterverarbeitung hier
  };

  return { login };
}
