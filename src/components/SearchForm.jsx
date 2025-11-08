export default function SearchForm({ onChangeValue }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Tìm theo name, username"
      onChange={(e) => onChangeValue(e.target.value)}
    />
  );
}
