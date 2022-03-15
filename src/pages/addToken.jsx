import { useRouter } from "next/router";
import { Button, Input, InputGroup, Logo, ShootingStar } from "../components";
import { useToken } from "../hooks/useToken";

const AddToken = () => {
  const { addToken, tokenExists } = useToken();
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    const { token, balance } = e.target;
    const tokenValue = token.value;
    const balanceValue = balance.value;

    if (!tokenValue || !balanceValue) {
      alert("Please, fill all fields");
      return;
    }

    if (tokenExists(tokenValue)) {
      alert("Token already exists.");
      return;
    }

    addToken({
      token: tokenValue,
      balance: balanceValue,
    });

    router.push("/");
  }

  return (
    <section className="max70">
      <header>
        <Logo />
        <div className="flex between">
          <ShootingStar />
        </div>

        <div className="flex between">
          Add Token
          <Button bgColor="grey" onClick={() => (window.location.href = "./")}>
            Go Back
          </Button>
        </div>
      </header>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="flex center column">
          <InputGroup>
            <label htmlFor="token">Token</label>
            <Input id="token" name="token" required />
          </InputGroup>

          <InputGroup>
            <label htmlFor="balance">Balance</label>
            <Input id="balance" type="number" name="balance" required />
          </InputGroup>

          <Button align="End">Save</Button>
        </div>
      </form>
    </section>
  );
};

export default AddToken;
