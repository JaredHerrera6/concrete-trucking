import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Baseurl from "../apis/Baseurl";

const NewOrder = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { firstname } = useParams();
  const { lastname } = useParams();
  const name = firstname.concat(" ", lastname);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [address, setAddress] = useState("");
  const [yards, setYards] = useState(null);
  const [psi, setPsi] = useState(null);
  const [stone, setStone] = useState("");
  const [accelerator, setAccelerator] = useState(0);
  const [retarder, setRetarder] = useState(0);
  const [slump, setSlump] = useState(null);
  const [unload, setUnload] = useState("");
  const [instruction, setInstructions] = useState(null);
  //This use effect will fetch the customer with the given id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Baseurl.get(`/users/customers/${id}`);
        setSelectedCustomer(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Baseurl.post("/order/orders", {
        customer_name: name,
        address: address,
        psi: psi,
        stone: stone,
        accelerator: accelerator,
        retarder: retarder,
        yards: yards,
        slump: slump,
        unload_method: unload,
        special_in: instruction,
        customer_id: id,
      });
      navigate(`/users/customers/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center display-3">New Order</h1>
      <h1 className="display text-decoration-underline">
        <u>New Order Form</u>
      </h1>
      <form>
        {/*Form to get the information for the new Order*/}
        <div class="form-group w-50">
          <label for="namerow">Name</label>
          <input
            type="text"
            class="form-control"
            id="namerow"
            disabled={true}
            value={name}
            placeholder={name}
          />
        </div>
        <div class="form-group w-50">
          <label for="addressinput">Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            class="form-control"
            id="addressinput"
            placeholder="Enter Address"
            required
          />
        </div>
        <div class="form-group w-50">
          <label for="selectpsi">PSI</label>
          <select
            value={psi}
            onChange={(e) => setPsi(e.target.value)}
            class="form-control"
            id="selectpsi"
            required
          >
            <option disabled>PSI</option>
            <option value="3000">3000</option>
            <option value="3500">3500</option>
            <option value="4000">4000</option>
            <option value="4500">4500</option>
            <option value="5000">5000</option>
          </select>
        </div>
        <div class="form-group w-50">
          <label for="selectstone">Stone</label>
          <select
            value={stone}
            onChange={(e) => setStone(e.target.value)}
            class="form-control"
            id="selectstone"
            required
          >
            <option disabled>Stone</option>
            <option value="57 Gravel">57 Gravel</option>
            <option value="Pea Gravel">Pea Gravel</option>
          </select>
        </div>
        <div class="form-group w-50">
          <label for="selectaccelerator">Acceletator</label>
          <select
            value={accelerator}
            onChange={(e) => setAccelerator(e.target.value)}
            class="form-control"
            id="selectaccelerator"
            required
          >
            <option default disabled>
              Accelerator
            </option>
            <option value="0">0%</option>
            <option value="1">1%</option>
            <option value="2">2%</option>
            <option value="3">3%</option>
            <option value="4">4%</option>
            <option value="5">5%</option>
          </select>
        </div>
        <div class="form-group w-50">
          <label for="selectretarder">Retarder</label>
          <select
            value={retarder}
            onChange={(e) => setRetarder(e.target.value)}
            class="form-control"
            id="selectRetarder"
            required
          >
            <option default disabled>
              Retarder
            </option>
            <option value="0">0%</option>
            <option value="1">1%</option>
            <option value="2">2%</option>
            <option value="3">3%</option>
            <option value="4">4%</option>
            <option value="5">5%</option>
          </select>
        </div>
        <div class="form-group w-50">
          <label for="yardsinput">Yards</label>
          <input
            value={yards}
            onChange={(e) => setYards(e.target.value)}
            type="number"
            min={1}
            class="form-control"
            id="yardsinput"
            placeholder="Enter Yards"
            required
          />
        </div>
        <div class="form-group w-50">
          <label for="slumpinput">Slump</label>
          <input
            value={slump}
            onChange={(e) => setSlump(e.target.value)}
            type="number"
            min={1}
            max={10}
            class="form-control"
            id="slumpinput"
            placeholder="Enter Slump"
            required
          />
        </div>
        <div class="form-group w-50">
          <label for="unloadMethodinput">Unload Method</label>
          <input
            value={unload}
            onChange={(e) => setUnload(e.target.value)}
            type="text"
            class="form-control"
            id="unloadMethodinput"
            placeholder="Enter Unload Method"
            required
          />
        </div>
        <div class="form-group w-50">
          <label for="instructionsinput">Special Instructions</label>
          <input
            value={instruction}
            onChange={(e) => setInstructions(e.target.value)}
            type="text"
            class="form-control"
            id="instructionsinput"
            placeholder="Optional"
          />
        </div>

        <button onClick={handleSubmit} type="submit" class="btn btn-primary">
          Submit New Order
        </button>
      </form>
    </div>
  );
};
export default NewOrder;
