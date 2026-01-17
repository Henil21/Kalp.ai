import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";

export default function RouteLoader() {
  const location = useLocation();
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return null;
}
