import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Button,
  Input,
  InputGroup,
  Logo,
  ShootingStar,
} from "../../components";
import { useToken } from "../../hooks/useToken";
import { formatMoney } from "../../utils/FormatMoney";

const EditToken = () => {
  const { findTokenByTokenName, tokenExists, deleteToken, saveToken } =
    useToken();
  const router = useRouter();
  const { token } = router.query;
  const tokenData = findTokenByTokenName(token);

  useEffect(() => {
    if (token && !tokenData) {
      router.push("../");
    }
  }, [tokenData, token]);

  function handleSubmit(e) {
    e.preventDefault();

    const { token: tokenInput, balance } = e.target;
    const tokenValue = tokenInput.value;
    const balanceValue = balance.value.replace(/\D/g, ""); // remove all letters

    if (!tokenValue || !balanceValue) {
      alert("Please, fill all fields");
      return;
    }

    if (!tokenExists(token)) {
      alert("Token not exists.");
      return;
    }

    saveToken(token, {
      token: tokenValue.toUpperCase(),
      balance: balanceValue,
    });

    router.push("../");
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteToken(token);

      window.location.href = "../";
    }
  }

  return (
    <section className="max70">
      <header>
        <Logo />
        <div className="flex between">
          <ShootingStar />
        </div>

        <div className="flex between">
          Edit Token
          <Button bgColor="grey" onClick={() => (window.location.href = "../")}>
            Go Back
          </Button>
        </div>
      </header>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="flex center column">
          <InputGroup>
            <label htmlFor="token">Token</label>
            <Input id="token" name="token" defaultValue={token} required />
          </InputGroup>

          <InputGroup>
            <label htmlFor="balance">Balance</label>
            <Input
              id="balance"
              name="balance"
              defaultValue={formatMoney(tokenData?.balance)}
              required
            />
          </InputGroup>

          <div className="flex between">
            <Button bgColor="red" onClick={handleDelete} type="button">
              Remove
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EditToken;
