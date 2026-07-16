import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {

    const navigate = useNavigate();

    const [account, setAccount] = useState(null);

    const [editMode, setEditMode] = useState(false);

    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {

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

            setProfile({
                fullName: accountData.user.fullName,
                email: accountData.user.email,
                phone: accountData.user.phone
            });

        } catch (error) {

            console.error(error);

            alert("Failed to load profile");
        }
    };

    const updateProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.put(
                "/users/profile",
                profile,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

            setEditMode(false);

            getProfile();

        } catch (error) {

            console.log("FULL ERROR =", error);

            if (error.response) {

                console.log("STATUS =", error.response.status);

                console.log("DATA =", error.response.data);

                alert(error.response.data.message);

            } else {

                alert("Profile update failed");
            }
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>My Profile</h2>

            {account && (

                <div
                    style={{
                        border: "1px solid gray",
                        padding: "20px",
                        width: "550px",
                        borderRadius: "10px"
                    }}
                >

                    <h3>Personal Information</h3>

                    {!editMode ? (

                        <>
                            <p>
                                <strong>Name:</strong>{" "}
                                {account.user.fullName}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {account.user.email}
                            </p>

                            <p>
                                <strong>Phone:</strong>{" "}
                                {account.user.phone}
                            </p>

                            <p>
                                <strong>Role:</strong>{" "}
                                {account.user.role}
                            </p>

                            <button
                                onClick={() => setEditMode(true)}
                            >
                                Edit Profile
                            </button>

                            {" "}

                            <button
                                onClick={() => navigate("/change-password")}
                            >
                                Change Password
                            </button>
                        </>

                    ) : (

                        <>
                            <label>
                                <strong>Full Name</strong>
                            </label>

                            <br />

                            <input
                                type="text"
                                value={profile.fullName}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        fullName: e.target.value
                                    })
                                }
                            />

                            <br /><br />

                            <label>
                                <strong>Email</strong>
                            </label>

                            <br />

                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        email: e.target.value
                                    })
                                }
                            />

                            <br /><br />

                            <label>
                                <strong>Phone</strong>
                            </label>

                            <br />

                            <input
                                type="text"
                                value={profile.phone}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        phone: e.target.value
                                    })
                                }
                            />

                            <br /><br />

                            <button
                                onClick={updateProfile}
                            >
                                Save Changes
                            </button>

                            {" "}

                            <button
                                onClick={() => {

                                    setEditMode(false);

                                    setProfile({
                                        fullName: account.user.fullName,
                                        email: account.user.email,
                                        phone: account.user.phone
                                    });

                                }}
                            >
                                Cancel
                            </button>
                        </>

                    )}

                    <hr />

                    <h3>Account Information</h3>

                    <p>
                        <strong>Account Number:</strong>{" "}
                        {account.accountNumber}
                    </p>

                    <p>
                        <strong>Account Type:</strong>{" "}
                        {account.accountType}
                    </p>

                    <p>
                        <strong>Balance:</strong>{" "}
                        ₹{account.balance}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {account.status}
                    </p>

                </div>
            )}

        </div>
    );
}

export default Profile;