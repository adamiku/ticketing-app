import axios, { AxiosError } from "axios";
import { useState } from "react";

type Props = {
  url: string;
  method: "get" | "post";
  body: object;
  onSuccess?: Function;
};
export const useRequest = ({ url, method, body, onSuccess }: Props) => {
  const [errors, setErrors] = useState<JSX.Element | null>(null);
  const doRequest = async () => {
    setErrors(null);

    try {
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setErrors(
          <div>
            <ul>
              {error.response.data.errors.map((err) => (
                <li key={err.message} className="text-red-700">
                  {err.message}
                </li>
              ))}
            </ul>
          </div>
        );
      }
    }
  };
  return { doRequest, errors };
};
