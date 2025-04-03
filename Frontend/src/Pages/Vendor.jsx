import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Vendor() {
    document.title = 'StockPulse - Vendor'
    const [vendors, setVendors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [venId, setVenId] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        axios.get('http://localhost:1234/Vendor')
            .then((res) => {
                if (res.status === 201) setVendors(res.data['data']);
            })
            .catch((err) => console.error("Error fetching vendors:", err));
    }, []);
    // console.log(vendors )
    const handleAddVendor = () => {
        axios.post('http://localhost:1234/Vendor/newVendor', { venId, name, location })
            .then((res) => {
                alert(res.data.msg);
                setShowForm(false);
                setVendors([...vendors, { _id: venId, name, location }]); // Update UI
            })
            .catch((err) => console.error("Error adding vendor:", err));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Vendor Management</h1>
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => setShowForm(!showForm)}
            >
                Add Vendor
            </button>

            {showForm && (
                <div className="mb-4">
                    <input type="number" placeholder="Vendor ID" onChange={(e) => setVenId(e.target.value)} className="border p-2 mr-2" />
                    <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} className="border p-2 mr-2" />
                    <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} className="border p-2" />
                    <button onClick={handleAddVendor} className="bg-green-500 text-white px-4 py-2 ml-2">Submit</button>
                </div>
            )}

            <table className="w-full border-collapse border border-gray-500">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Vendor ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.length > 0 ? (
                        vendors.map((vendor) => (
                            <tr key={vendor._id} className="border">
                                <td className="border p-2">{vendor._id}</td>
                                <td className="border p-2">{vendor.name}</td>
                                <td className="border p-2">{vendor.location}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-4">No vendors found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Vendor;
