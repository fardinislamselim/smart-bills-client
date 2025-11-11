import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxios from "../hook/useAxios";

const BillsPage = () => {
  const instance = useAxios();
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch all categories (optional, you can hardcode if needed)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await instance.get("/bills/categories");
        setCategories(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch bills (with optional category filter)
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const url = selectedCategory
          ? `/bills?category=${selectedCategory}`
          : "/bills";
        const { data } = await instance.get(url);
        setBills(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBills();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto p-4">
      {/* Filter Dropdown */}
      <div className="mb-6">
        <label htmlFor="category" className="mr-2 font-semibold">
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={"select"}
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Bills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <div
            key={bill._id}
            className="border rounded-lg shadow-lg p-4 flex flex-col"
          >
            <img
              src={bill.image}
              alt={bill.title}
              className="h-60 object-cover rounded mb-4"
            />
            <h3 className="font-bold text-lg mb-1">{bill.title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              Category: {bill.category}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Location: {bill.location}
            </p>
            <p className="text-sm font-semibold mb-3">Amount: ${bill.amount}</p>
            <button
              onClick={() => navigate(`/bills/${bill._id}`)}
              className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillsPage;
