import React, { useEffect, useState } from "react";
import SearchEngine from "../assets/Components/SearchEngine";
import axios from "axios";
import Cookie from "js-cookie";

function Inventory() {
    document.title = "StockPulse - Inventory";

    const [search, setSearch] = useState("");
    const [res, setRes] = useState(null);
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Form Fields
    const [name, setName] = useState("");
    const [mrp, setMrp] = useState(0);
    const [quan, setQuan] = useState(0);
    const [rp, setRP] = useState(0);
    const [cate, setCate] = useState("");
    const [storeId, setStore] = useState(0);
    const [bought, setB] = useState(0);
    const [sold, setS] = useState(0);
    const [season, setSeason] = useState("");
    const [promo, setPromo] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:1234/Inventory/${Cookie.get("StoreID")}`)
            .then((res) => setData(res.data || []))
            .catch((err) => setMsg(err.message));
    }, []);

    const handleSearch = () => {
        axios
            .get(`http://localhost:1234/Inventory/NameSearch/${search}`)
            .then((res) => setRes(res.data))
            .catch((err) => setMsg(err.message));
    };

    const handleSubmit = () => {
        const productData = {
            Name: name,
            MRP: mrp,
            Quantity: quan,
            sID: storeId,
            RP: rp,
            Category: cate,
            uB: bought,
            uS: sold,
            season: season,
            p: promo,
        };

        if (editingProduct) {
            axios
                .put(`http://localhost:1234/Inventory/Update/${editingProduct._id}`, productData)
                .then(() => {
                    setMsg("Product Updated Successfully");
                    setShowForm(false);
                    setEditingProduct(null);
                })
                .catch((err) => setMsg("Error: " + err.message));
        } else {
            axios
                .post("http://localhost:1234/Inventory/NewAdmin", productData)
                .then(() => {
                    setMsg("New Product Successfully Added");
                    setShowForm(false);
                })
                .catch((err) => setMsg("Error: " + err.message));
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
        setName(product.productName);
        setMrp(product.MRP);
        setQuan(product.Quantity);
        setRP(product.RetailPrice);
        setCate(product.Category);
        setStore(product.storeID);
        setB(product.unitsBought);
        setS(product.unitsSold);
        setSeason(product.Seasonality);
        setPromo(product.Promotion);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>

            <div className="mb-4 flex items-center gap-2">
                <SearchEngine setSearch={setSearch} />
                <button onClick={handleSearch} className="p-2 bg-blue-600 text-white rounded-md">
                    Search
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingProduct ? "Edit Product" : "Add New Product"}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Product Name", value: name, setter: setName },
                            { label: "MRP", value: mrp, setter: setMrp },
                            { label: "Quantity", value: quan, setter: setQuan },
                            { label: "Retail Price", value: rp, setter: setRP },
                            { label: "Category", value: cate, setter: setCate },
                            { label: "Store ID", value: storeId, setter: setStore },
                            { label: "Units Bought", value: bought, setter: setB },
                            { label: "Units Sold", value: sold, setter: setS },
                            { label: "Seasonality", value: season, setter: setSeason },
                            { label: "Promotion", value: promo, setter: setPromo },
                        ].map((field, index) => (
                            <div key={index}>
                                <label className="block font-semibold">{field.label}</label>
                                <input
                                    type="text"
                                    value={field.value}
                                    onChange={(e) => field.setter(e.target.value)}
                                    className="p-2 border rounded-md w-full"
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
                        {editingProduct ? "Update Product" : "Submit"}
                    </button>
                </div>
            )}

            <table className="w-full border-collapse border border-gray-300 mt-6 bg-white">
                <thead>
                    <tr className="bg-gray-200">
                        {["ID", "Product Name", "MRP", "Quantity", "Retail Price", "Category", "Store ID", "Units Bought", "Units Sold", "Seasonality", "Promotion", "Edit"].map((header) => (
                            <th key={header} className="border p-2">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item._id} className="text-center">
                                {[item._id, item.productName, item.MRP, item.Quantity, item.RetailPrice, item.Category, item.storeID, item.unitsBought, item.unitsSold, item.Seasonality, item.Promotion].map((value, i) => (
                                    <td key={i} className="border p-2">{value}</td>
                                ))}
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(item)} className="px-2 py-1 bg-yellow-500 text-white rounded-md">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="12" className="text-center p-4">No products available</td></tr>
                    )}
                </tbody>
            </table>

            <p className="text-red-500">{msg}</p>
        </div>
    );
}

export default Inventory;
