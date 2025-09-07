import React, { useEffect, useState } from "react";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/contact-seller");
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Delete a message
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/contact-seller/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(messages.filter((msg) => msg._id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  // Filter messages based on search input
  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1>Contact Messages</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name, email, or message..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />

      {loading ? (
        <p>Loading messages...</p>
      ) : filteredMessages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Submitted At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleString()}</td>
                <td>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(msg._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    maxWidth: "900px",
    margin: "50px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  deleteBtn: {
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AdminMessages;
