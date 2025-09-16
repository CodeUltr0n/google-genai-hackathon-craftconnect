import React, { useState, useRef } from "react";

const categories = [
  "Electronics",
  "Fashion & Apparel",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Toys & Games",
  "Books & Stationery",
  "Sports & Outdoors",
  "Automotive",
  "Health & Wellness",
  "Pet Supplies",
  "Jewelry & Accessories",
  "Office Supplies",
  "Grocery & Gourmet",
  "Other",
];

const conversionRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0097,
  JPY: 1.65,
  AUD: 0.018,
};

export default function AddNewProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
    currency: "INR",
  });
  const [dragActive, setDragActive] = useState(false);
  const [imageName, setImageName] = useState("");
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
      }));
      setImageName(file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setForm((prev) => ({
        ...prev,
        image: file,
      }));
      setImageName(file.name);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("category", form.category);
    formData.append("currency", form.currency);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      // Optionally handle success response here
    } catch (error) {
      console.error(error);
      // Optionally handle error here
    }

    // Reset form after submission
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      image: null,
      currency: "INR",
    });
    setImageName("");
  };

  const convertedPrice = () => {
    const priceInINR = parseFloat(form.price);
    if (isNaN(priceInINR) || priceInINR < 0) return "";
    const rate = conversionRates[form.currency] || 1;
    if (form.currency === "INR") return "";
    const converted = priceInINR * rate;
    return `${form.currency} ${converted.toFixed(2)}`;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Add New Product</h2>
      <p className="text-gray-500 mb-6">Fill in the details below to list a new product on your marketplace store.</p>
      <form onSubmit={handleSubmit} autoComplete="off">
        {/* Product Details Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Product Details</h3>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief product description"
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">            <div className="flex-1">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {convertedPrice() && (
                <p className="mt-1 text-sm text-gray-500">Converted Price: {convertedPrice()}</p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                Currency <span className="text-red-500">*</span>
              </label>
              <select
                id="currency"
                name="currency"
                value={form.currency}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="AUD">AUD</option>
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Image Upload Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Product Image</h3>
          <div
            className={`relative flex flex-col items-center justify-center border-2 ${
              dragActive ? "border-indigo-500 bg-indigo-50" : "border-dashed border-gray-300 bg-gray-50"
            } rounded-lg p-6 transition-colors duration-150 cursor-pointer mb-2`}
            onClick={handleImageClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            tabIndex={0}
            aria-label="Product image upload area"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleImageClick();
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload product image"
              tabIndex={-1}
            />
            <svg
              className="w-10 h-10 text-indigo-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 32V40C8 41.1046 8.89543 42 10 42H38C39.1046 42 40 41.1046 40 40V32M24 6V36M24 36L16 28M24 36L32 28"
              />
            </svg>
            <span className="text-gray-600">
              Drag & drop an image here, or <span className="text-indigo-600 underline">browse</span>
            </span>
            <span className="block text-xs text-gray-400 mt-1">Accepted formats: JPG, PNG, GIF</span>
          </div>
          {imageName && (
            <div className="mb-2 flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700 truncate">{imageName}</span>
            </div>
          )}
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}