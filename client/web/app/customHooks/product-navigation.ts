import { useNavigate } from "react-router";
export const useProductNavigation = (): ((id: string) => void) => {
  const navigate = useNavigate();
  return (id: string) => navigate(`/product/${id}`);
};
