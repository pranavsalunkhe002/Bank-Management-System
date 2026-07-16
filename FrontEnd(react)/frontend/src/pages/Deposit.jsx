import { useState } from "react";
import api from "../services/api";

function Deposit() {

    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");

    const handleDeposit = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/accounts/deposit",
                {
                    accountNumber,
                    amount
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("DEPOSIT RESPONSE =", response.data);

            alert("Deposit Successful");

        } catch (error) {

            console.error(error);

            if (error.response) {
                console.log(error.response.data);
            }

            alert("Deposit Failed");
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>Deposit Money</h2>

            <input
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) =>
                    setAccountNumber(e.target.value)
                }
            />

            <br /><br />

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                    setAmount(e.target.value)
                }
            />

            <br /><br />

            <button onClick={handleDeposit}>
                Deposit
            </button>

        </div>
    );
}

export default Deposit;