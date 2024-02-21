import axios from "axios";

// TODO create a separate server and client axios instance
const buildClient = async () => {
  if (typeof window === "undefined") {
    const { cookies, headers } = await import("next/headers");
    const session = cookies().get("session");
    const host = headers().get("Host");
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: {
        Host: host,
        Cookie: `session=${session?.value}`,
      },
    });
  } else {
    return axios.create({ baseURL: "/" });
  }
};

export default buildClient;
