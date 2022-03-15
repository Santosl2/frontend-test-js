import {
  ReactNode,
  createContext,
  useCallback,
  useState,
  useEffect,
} from "react";

export const TokenContext = createContext({});

export function TokenProvider({ children }) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const tokens = localStorage.getItem("@tokens");

    if (tokens) {
      setTokens(JSON.parse(tokens));
    }
  }, []);

  const findTokenByTokenName = useCallback(
    (token) => {
      return tokens.find((t) => t.token === token);
    },
    [tokens]
  );

  const tokenExists = useCallback(
    (token) => {
      return tokens.some((t) => t.token === token);
    },
    [tokens]
  );

  const addToken = useCallback(
    ({ token, balance }) => {
      setTokens((prev) => prev.concat({ token, balance }));

      const newData = [...tokens, { token, balance }];

      localStorage.setItem("@tokens", JSON.stringify(newData));
    },
    [tokens]
  );

  const deleteToken = useCallback(
    (token) => {
      const newTokens = tokens.filter((t) => t.token !== token);
      localStorage.setItem("@tokens", JSON.stringify(newTokens));
    },
    [tokens]
  );

  const saveToken = useCallback(
    (token, { token: newTokenName, balance: newBalance }) => {
      const tokenData = findTokenByTokenName(token);
      if (!tokenData) return;

      tokenData.token = newTokenName;
      tokenData.balance = newBalance;

      localStorage.setItem("@tokens", JSON.stringify(tokens));
    },
    [tokens]
  );

  return (
    <TokenContext.Provider
      value={{
        tokens,
        addToken,
        tokenExists,
        findTokenByTokenName,
        deleteToken,
        saveToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}
