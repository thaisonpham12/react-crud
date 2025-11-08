import React from "react";

export default function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(null); // object user đang sửa

  // tải dữ liệu 1 lần
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // nhận user mới từ AddUser (qua App)
  React.useEffect(() => {
    if (user) {
      setUsers((prev) => [...prev, { ...user, id: prev.length ? Math.max(...prev.map(u => u.id)) + 1 : 1 }]);
      onAdded();
    }
  }, [user, onAdded]);

  const filteredUsers = users.filter((u) => {
    const kw = (keyword || "").toLowerCase();
    return (
      u.name.toLowerCase().includes(kw) ||
      u.username.toLowerCase().includes(kw)
    );
  });

  // xóa
  const removeUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // mở form sửa (deep copy address)
  const editUser = (u) => {
    setEditing({ ...u, address: { ...u.address } });
  };

  const handleEditChange = (field, value) => {
    if (["street", "suite", "city"].includes(field)) {
      setEditing((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }));
    } else {
      setEditing((prev) => ({ ...prev, [field]: value }));
    }
  };

  const saveUser = () => {
    setUsers((prev) => prev.map((u) => (u.id === editing.id ? editing : u)));
    setEditing(null);
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 60 }}>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th style={{ width: 160 }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.address?.city}</td>
              <td>
                <button className="btn btn-ghost" onClick={() => editUser(u)}>Sửa</button>
                <button className="btn btn-danger" onClick={() => removeUser(u.id)}>Xóa</button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr><td colSpan="6" style={{ textAlign: "center" }}>Không có dữ liệu</td></tr>
          )}
        </tbody>
      </table>

      {/* Modal sửa */}
      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Sửa người dùng</h3>

            <label htmlFor="edit-name">Name</label>
            <input
              id="edit-name"
              value={editing.name || ""}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />

            <label htmlFor="edit-username">Username</label>
            <input
              id="edit-username"
              value={editing.username || ""}
              onChange={(e) => handleEditChange("username", e.target.value)}
            />

            <label htmlFor="edit-email">Email</label>
            <input
              id="edit-email"
              value={editing.email || ""}
              onChange={(e) => handleEditChange("email", e.target.value)}
            />

            <fieldset className="fieldset">
              <legend>Địa chỉ</legend>
              <label htmlFor="edit-street">Street</label>
              <input
                id="edit-street"
                value={editing.address?.street || ""}
                onChange={(e) => handleEditChange("street", e.target.value)}
              />
              <label htmlFor="edit-suite">Suite</label>
              <input
                id="edit-suite"
                value={editing.address?.suite || ""}
                onChange={(e) => handleEditChange("suite", e.target.value)}
              />
              <label htmlFor="edit-city">City</label>
              <input
                id="edit-city"
                value={editing.address?.city || ""}
                onChange={(e) => handleEditChange("city", e.target.value)}
              />
            </fieldset>

            <div className="modal-actions">
              <button className="btn" onClick={saveUser}>Lưu</button>
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
