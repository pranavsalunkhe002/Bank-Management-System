import { useState } from "react";
import api from "../services/api";

function ChangePassword() {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChangePassword = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/users/change-password",
                {
                    currentPassword,
                    newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

            setCurrentPassword("");
            setNewPassword("");

        } catch (error) {

            console.log(error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                alert(error.response.data.message);
            } else {
                alert("Password change failed");
            }
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>Change Password</h2>

            <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) =>
                    setCurrentPassword(e.target.value)
                }
            />

            <br /><br />

            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                    setNewPassword(e.target.value)
                }
            />

            <br /><br />

            <button onClick={handleChangePassword}>
                Change Password
            </button>

        </div>
    );
}

export default ChangePassword;