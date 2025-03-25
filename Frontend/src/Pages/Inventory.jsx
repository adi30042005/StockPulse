import React, { useEffect, useState } from "react";
import SearchEngine from "../assets/Components/SearchEngine";
import axios from "axios";
import Cookie from "js-cookie";

function Inventory() {
  const [Search, setSearch] = useState("");
  const [res, setRes] = useState(null);
  const [option, setOption] = useState("");
  const [name, setName] = useState("");
  const [mrp, setMrp] = useState(0);
  const [quan, setQuan] = useState(0);
  const [RP, setRP] = useState(0);
  const [Cate, setCate] = useState("");
  const [StoreId, setStore] = useState(0);
  const [bought, setB] = useState(0);
  const [sold, setS] = useState(0);
  const [season, setSeason] = useState("");
  const [promo, setPromo] = useState("");
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:1234/Inventory/${Cookie.get("StoreID")}`)
      .then((res) => {
        setData(res.data || "No products are present");
      })
      .catch((err) => {
        setMsg(err.message);
      });
  }, []);

  const handleSearch = () => {
    axios
      .get(`http://localhost:1234/Inventory/NameSearch/${Search}`)
      .then((res) => setRes(res.data))
      .catch((err) => setMsg(err.message));
  };

  const handleSubmit = () => {
    const newPdt = {
      productName: name,
      MRP: mrp,
      Quantity: quan,
      storeID: StoreId,
      RetailPrice: RP,
      Category: Cate,
      unitsBought: bought,
      unitsSold: sold,
      Seasonality: season,
      Promotion: promo,
    };

    axios
      .post("http://localhost:1234/Inventory/NewAdmin", newPdt)
      .then(() => setMsg("New Product Successfully added"))
      .catch((err) => setMsg("Error: " + err.message));
  };

  return (
    <div>
      <h1>Inventory Management</h1>
      <SearchEngine SetSearch={setSearch} />
      <button onClick={handleSearch}>Search</button>
      <br />
      {res && <p>{JSON.stringify(res)}</p>}
      <button onClick={() => setOption("clicked")}>+</button>
      {option && (
        <div>
          <label>Product Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} /> <br />
          <label>MRP:</label>
          <input type="number" onChange={(e) => setMrp(parseFloat(e.target.value) || 0)} /> <br />
          <label>Quantity:</label>
          <input type="number" onChange={(e) => setQuan(parseInt(e.target.value) || 0)} /> <br />
          <label>Retail Price:</label>
          <input type="number" onChange={(e) => setRP(parseFloat(e.target.value) || 0)} /> <br />
          <label>Category:</label>
          <input type="text" onChange={(e) => setCate(e.target.value)} /> <br />
          <label>Store ID:</label>
          <input type="number" onChange={(e) => setStore(parseInt(e.target.value) || 0)} /> <br />
          <label>Units Bought:</label>
          <input type="number" onChange={(e) => setB(parseInt(e.target.value) || 0)} /> <br />
          <label>Units Sold:</label>
          <input type="number" onChange={(e) => setS(parseInt(e.target.value) || 0)} /> <br />
          <label>Seasonality:</label>
          <input type="text" onChange={(e) => setSeason(e.target.value)} /> <br />
          <label>Promotion:</label>
          <input type="text" onChange={(e) => setPromo(e.target.value)} /> <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      <br />
      {data && <p>{JSON.stringify(data)}</p>}
      <p>{msg}</p>
    </div>
  );
}

export default Inventory;
