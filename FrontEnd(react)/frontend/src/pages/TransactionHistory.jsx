import { useState, useEffect } from "react";
import api from "../services/api";

function TransactionHistory() {

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

            getTransactionHistory(accountData.accountNumber);

        } catch (error) {

            console.error(error);

            alert("Failed to load account");
        }
    };

    const getTransactionHistory = async (accountNumber) => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                `/transactions/history/${accountNumber}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            setTransactions(response.data.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load transaction history");
        }
    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Transaction History</h2>

            {account && (

                <div
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "20px"
                    }}
                >

                    <p>

                        <strong>Account Number:</strong>{" "}

                        {account.accountNumber}

                    </p>

                    <p>

                        <strong>Available Balance:</strong>{" "}

                        ₹{account.balance}

                    </p>

                </div>

            )}

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                <tr>

                    <th>Date & Time</th>
                    <th>Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Amount</th>
                    <th>Status</th>

                </tr>

                </thead>

                <tbody>

                {transactions.map((transaction, index) => (

                    <tr key={index}>

                        <td>{transaction.transactionDate}</td>

                        <td>{transaction.transactionType}</td>

                        <td>{transaction.senderAccount}</td>

                        <td>{transaction.receiverAccount}</td>

                        <td>₹{transaction.amount}</td>

                        <td>{transaction.status}</td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );
}

export default TransactionHistory;