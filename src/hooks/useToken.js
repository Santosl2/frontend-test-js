import { useContext } from "react";
import { TokenContext } from "../context/TokenContext";

export function useToken() {
  const ctx = useContext(TokenContext);

  return ctx;
}
