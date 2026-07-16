import { useState, useEffect } from "react";
import api from "../services/api";

function Transfer() {

    const [account, setAccount] = useState(null);

    const [toAccount, setToAccount] = useState("");

    const [amount, setAmount] = useState("");

    useEffect(() => {
        getMyAccount();
    }, []);

    const getMyAccount = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/accounts/my-account",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("MY ACCOUNT =", response.data);

            setAccount(response.data.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load account");
        }
    };

    const handleTransfer = async () => {

        try {
            if (!toAccount) {
                alert("Please enter receiver account number");
                return;
            }

            if (!amount || amount <= 0) {
                alert("Enter valid amount");
                return;
            }

            if (toAccount === account.accountNumber) {
                alert("Cannot transfer to same account");
                return;
            }

            const token = localStorage.getItem("token");

            console.log("TRANSFER TOKEN =", token);

            const requestBody = {
                fromAccount: account.accountNumber,
                toAccount,
                amount
            };

            console.log("REQUEST BODY =", requestBody);

            const response = await api.post(
                "/accounts/transfer",
                requestBody,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("TRANSFER RESPONSE =", response.data);

            alert(response.data.message);
            await getMyAccount();
            setToAccount("");
            setAmount("");

        } catch (error) {

            console.log(error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {

                alert(error.response.data.message);

            } else {

                alert("Transfer Failed");
            }
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>Transfer Money</h2>

            {account && (
                <div
                    style={{
                        marginBottom: "20px",
                        padding: "10px",
                        border: "1px solid gray"
                    }}
                >
                    <p>
                        <strong>From Account:</strong>
                        {" "}
                        {account.accountNumber}
                    </p>

                    <p>
                        <strong>Available Balance:</strong>
                        {" "}
                        ₹{account.balance}
                    </p>
                </div>
            )}

            <input
                type="text"
                placeholder="To Account Number"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <br /><br />

            <button
                onClick={handleTransfer}
                disabled={!account}
            >
                Transfer
            </button>

        </div>
    );
}

export default Transfer;