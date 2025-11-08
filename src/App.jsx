import './App.css'
import React from "react"
import SearchForm from "./components/SearchForm.jsx";
import AddUser from "./components/AddUser.jsx";
import ResultTable from "./components/ResultTable.jsx";

function App() { 
  const [kw, setKeyword] = React.useState(""); 
  const [newUser, setNewUser] = React.useState(null); 
  return ( 
  <div> 
    <SearchForm onChangeValue={setKeyword} /> 
    <AddUser onAdd={setNewUser} /> 
    <ResultTable keyword={kw} user={newUser} onAdded={() => setNewUser(null)} />
    <h1>Quản lý người dùng</h1> 0
  </div> 
);
}

export default App