"use client";

import { useRequest } from "@/app/hooks/use-request";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Signout() {
  const router = useRouter();
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out</div>;
}

export default Signout;
