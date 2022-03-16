import { Button, Logo, ShootingStar } from "../components";
import { FiEdit } from "react-icons/fi";
import { useToken } from "../hooks/useToken";
import { formatMoney } from "../utils/FormatMoney";

const Home = () => {
  const { tokens } = useToken();

  return (
    <section className="max70">
      <header>
        <Logo />
        <div className="flex between">
          <ShootingStar />
          <Button onClick={() => (window.location.href = "./addToken")}>
            Add Token
          </Button>
        </div>
      </header>
      <div className="flex center">
        {tokens.length >= 1 && (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Tokens</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => {
                return (
                  <tr key={token.token}>
                    <td
                      onClick={() => {
                        window.location.href = `/editToken/${token.token}`;
                      }}
                    >
                      <FiEdit size={16} />
                    </td>
                    <td>{token.token}</td>
                    <td>{formatMoney(token.balance)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {tokens.length <= 0 && <h4>No Tokens</h4>}
      </div>
    </section>
  );
};

export default Home;
