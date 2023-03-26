import React from "react";
import Baseurl from "../apis/Baseurl";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const NewCustomer = () => {
  let navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const role = "customer";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Baseurl.post("/user/newCustomer", {
        first_name: firstname,
        last_name: lastname,
        _role: role,
        username: username,
        password: password,
      });
      navigate("/users/customers");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-center display-3">New Customer</h1>
      <h1 className="display text-decoration-underline">
        <u>New Customer Form</u>
      </h1>

      <form action="">
        <div class="form-group w-50">
          <label for="firstnameinput">First Name</label>
          <input
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            class="form-control"
            id="firstnameinput"
            placeholder="Enter First Name"
            required
          />
        </div>
        <div class="form-group w-50">
          <label for="lastnameinput">Last Name</label>
          <input
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            class="form-control"
            id="lastnameinput"
            placeholder="Enter Last Name"
            required
          />
        </div>
        <div class="form-group w-50">
          <label for="usernameinput">UserName</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            class="form-control"
            id="usernameinput"
            placeholder="Enter UserName"
            required
          />
        </div>
        <div class="form-group w-50">
          <label for="passwordinput">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            class="form-control"
            id="passwordinput"
            placeholder="Enter Password"
            required
          />
        </div>
        <button onClick={handleSubmit} type="submit" class="btn btn-primary">
          Create New Customer
        </button>
      </form>
    </div>
  );
};
export default NewCustomer;
