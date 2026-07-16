import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (
        <div style={{ padding: "20px" }}>

            <h1>Online Banking Dashboard</h1>

            <hr />

            <button onClick={logout}>
                Logout
            </button>

            <hr />

            <h2>Banking Services</h2>

            <button
                onClick={() =>
                    navigate("/dashboard/account")
                }
            >
                View Account
            </button>

            <br /><br />
            <button
                onClick={() => navigate("/profile")}
            >
                Profile
            </button>

            <br /><br />
            <button onClick={() =>
                navigate("/dashboard/transfer")
            }>
                Transfer Money
            </button>
            <br /><br />
            <button
                onClick={() =>
                    navigate("/dashboard/deposit")
                }
            >
                Deposit Money
            </button>

            <br /><br />

            <button
                onClick={() =>
                    navigate("/dashboard/withdraw")
                }
            >
                Withdraw Money
            </button>

            <br /><br />

            <button
                onClick={() =>
                    navigate("/dashboard/statement")
                }
            >
                Mini Statement
            </button>
<br/><br/>
            <button
                onClick={() =>
                    navigate("/transaction-history")
                }
            >
                Transaction History
            </button>

            <br/><br/>
            <button
                onClick={() => navigate("/change-password")}
            >
                Change Password
            </button>

        </div>
    );
}

export default Dashboard;