import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
    router.push("/");
  }, []);

  return <div>Logging Out</div>;
};

export default Logout;
