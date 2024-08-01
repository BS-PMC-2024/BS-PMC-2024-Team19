import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./UserStatByAdmin.css";

const UserStatByAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:6500/backend/auth/getAllUsers"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const removeUser = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        title: "custom-title",
        content: "custom-content",
        confirmButton: "custom-confirm-button",
        cancelButton: "custom-cancel-button",
      },
      didOpen: () => {
        // Increase font size dynamically using JavaScript
        document.querySelector(".custom-title").style.fontSize = "24px";
        document.querySelector(".custom-content").style.fontSize = "18px";
        document.querySelector(".custom-confirm-button").style.fontSize =
          "16px";
        document.querySelector(".custom-cancel-button").style.fontSize = "16px";
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          "http://localhost:6500/backend/auth/deleteUserByAdmin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Delete result:", data);

        setUsers(users.filter((user) => user.email !== email));
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        console.error("Delete error:", error);
        setError("Failed to delete user");
        Swal.fire("Error!", "Failed to delete the user.", "error");
      }
    }
  };

  const updateUserStatus = async (email, newStatus) => {
    try {
      const response = await fetch(
        "http://localhost:6500/backend/auth/updateUserStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, isPrime: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Update result:", data);

      setUsers(
        users.map((user) =>
          user.email === email ? { ...user, isPrime: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Update error:", error);
      setError("Failed to update user status");
    }
  };

  const handleStatusChange = (email, value) => {
    const newStatus = value === "Prime";
    updateUserStatus(email, newStatus);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-stat-container">
      <h2>User Details:</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Remove User</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.email}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.isPrime ? "Prime" : "Not Prime"}
                    onChange={(e) =>
                      handleStatusChange(user.email, e.target.value)
                    }
                  >
                    <option value="Prime">Prime</option>
                    <option value="Not Prime">Not Prime</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => removeUser(user.email)}>Remove</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserStatByAdmin;
