import { useState } from "react";
import api from "../services/api";

function AccountDetails() {

    const [accountNumber, setAccountNumber] = useState("");

    const [account, setAccount] = useState(null);
    console.log("ACCOUNT STATE =", account);
    const getAccountDetails = async () => {

        try {

            const token = localStorage.getItem("token");
            console.log("TOKEN =", token);
            const response = await api.get(
                `/accounts/${accountNumber}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("ACCOUNT RESPONSE JSON");

            console.log(JSON.stringify(response.data, null, 2));
            setAccount(response.data.data);

        } catch (error) {

            console.log("FULL ERROR:", error);

            if (error.response) {
                console.log("STATUS:", error.response.status);
                console.log("DATA:", error.response.data);
            }

            alert("Failed to fetch account details");
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>Account Details</h2>

            <input
                type="text"
                placeholder="Enter Account Number"
                value={accountNumber}
                onChange={(e) =>
                    setAccountNumber(e.target.value)
                }
            />

            <button
                onClick={getAccountDetails}
                style={{ marginLeft: "10px" }}
            >
                Get Details
            </button>

            {account && (

                <div
                    style={{
                        marginTop: "20px",
                        border: "1px solid gray",
                        padding: "15px"
                    }}
                >

                    <h3>Account Information</h3>

                    <p>
                        <strong>Account Number:</strong>
                        {" "}
                        {account.accountNumber}
                    </p>
                    <p>
                        <strong> Account Holder Name :</strong>
                        {" "}
                        {account.user.fullName}
                    </p>
                    <p>
                        <strong>Email:</strong>
                        {" "}
                        {account.user.email}
                    </p>

                    <p>
                        <strong>Mobile:</strong>
                        {" "}
                        {account.user.phone}
                    </p>
                    <p>
                        <strong>Account Type:</strong>
                        {" "}
                        {account.accountType}
                    </p>

                    <p>
                        <strong>Balance:</strong>
                        {" "}
                        ₹{account.balance}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        {" "}
                        {account.status}
                    </p>

                </div>
            )}

        </div>
    );
}

export default AccountDetails;