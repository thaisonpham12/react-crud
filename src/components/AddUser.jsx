import React from "react";

export default function AddUser({ onAdd }) {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      setUser((prev) => ({ ...prev, address: { ...prev.address, [id]: value } }));
    } else {
      setUser((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleAdd = () => {
    if (!user.name.trim() || !user.username.trim()) {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    onAdd(user);
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: "",
    });
    setOpen(false);
  };

  return (
    <>
      <button className="btn" onClick={() => setOpen(true)}>Thêm</button>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Thêm người dùng</h3>

            <label htmlFor="name">Name</label>
            <input id="name" value={user.name} onChange={handleChange} />

            <label htmlFor="username">Username</label>
            <input id="username" value={user.username} onChange={handleChange} />

            <label htmlFor="email">Email</label>
            <input id="email" value={user.email} onChange={handleChange} />

            <fieldset className="fieldset">
              <legend>Địa chỉ</legend>
              <label htmlFor="street">Street</label>
              <input id="street" value={user.address.street} onChange={handleChange} />
              <label htmlFor="suite">Suite</label>
              <input id="suite" value={user.address.suite} onChange={handleChange} />
              <label htmlFor="city">City</label>
              <input id="city" value={user.address.city} onChange={handleChange} />
            </fieldset>

            <label htmlFor="phone">Phone</label>
            <input id="phone" value={user.phone} onChange={handleChange} />

            <label htmlFor="website">Website</label>
            <input id="website" value={user.website} onChange={handleChange} />

            <div className="modal-actions">
              <button className="btn" onClick={handleAdd}>Lưu</button>
              <button className="btn btn-ghost" onClick={() => setOpen(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
