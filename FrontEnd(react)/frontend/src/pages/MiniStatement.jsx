import { useState, useEffect } from "react";
import api from "../services/api";

function MiniStatement() {

    const [account, setAccount] = useState(null);

    const [transactions, setTransactions] = useState([]);

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

            const accountData = response.data.data;

            setAccount(accountData);

            getMiniStatement(accountData.accountNumber);

        } catch (error) {

            console.error(error);

            alert("Failed to load account");
        }
    };

    const getMiniStatement = async (accountNumber) => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                `/transactions/${accountNumber}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            setTransactions(response.data.data);

        } catch (error) {

            console.log("FULL ERROR =", error);

            if (error.response) {

                console.log("STATUS =", error.response.status);

                console.log("DATA =", JSON.stringify(error.response.data, null, 2));
            }

            alert("Failed to fetch mini statement");
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>Mini Statement</h2>

            {account && (
                <div
                    style={{
                        marginBottom: "20px",
                        border: "1px solid gray",
                        padding: "10px"
                    }}
                >
                    <p>
                        <strong>Account Number:</strong>
                        {" "}
                        {account.accountNumber}
                    </p>

                    <p>
                        <strong>Balance:</strong>
                        {" "}
                        ₹{account.balance}
                    </p>
                </div>
            )}

            <table
                border="1"
                cellPadding="10"
                style={{
                    borderCollapse: "collapse",
                    width: "100%"
                }}
            >
                <thead>
                <tr>
                    <th>Date</th>
                    <th>From Account</th>
                    <th>To Account</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
                </thead>

                <tbody>

                {transactions.map((transaction, index) => (

                    <tr key={index}>

                        <td>
                            {transaction.transactionDate}
                        </td>
                        <td>{transaction.senderAccount}</td>
                        <td>{transaction.receiverAccount}</td>
                        <td>
                            {transaction.transactionType}
                        </td>

                        <td>
                            ₹{transaction.amount}
                        </td>

                        <td>
                            {transaction.status}
                        </td>

                    </tr>

                ))}

                </tbody>
            </table>

        </div>
    );
}

export default MiniStatement;