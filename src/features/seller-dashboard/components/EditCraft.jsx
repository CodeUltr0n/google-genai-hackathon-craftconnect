import React, { useState, useRef, useEffect } from "react";

const craftCategories = [
  "Painting",
  "Sculpture",
  "Handicraft",
  "Textile",
  "Pottery",
  "Jewelry",
  "Woodwork",
  "Metalwork",
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

export default function EditCraft({ craftId }) {
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

  useEffect(() => {
    // Fetch existing craft details
    const fetchCraft = async () => {
      try {
        const response = await fetch(`/api/crafts/${craftId}`);
        const data = await response.json();
        setForm({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category: data.category,
          image: null, // image will be handled separately
          currency: data.currency || "INR",
        });
        setImageName(data.imageName || "");
      } catch (error) {
        console.error("Failed to fetch craft details:", error);
      }
    };
    fetchCraft();
  }, [craftId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setImageName(file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setForm((prev) => ({ ...prev, image: file }));
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
    if (form.image) formData.append("image", form.image);

    try {
      const response = await fetch(`/api/crafts/${craftId}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update craft");
      alert("Craft updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating craft");
    }
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
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Edit Craft</h2>
      <p className="text-gray-500 mb-6">Update the details of your craft below.</p>

      <form onSubmit={handleSubmit} autoComplete="off">
        {/* Craft Details */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Craft Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter craft name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief craft description"
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {convertedPrice() && (
                <p className="mt-1 text-sm text-gray-500">Converted: {convertedPrice()}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency <span className="text-red-500">*</span>
              </label>
              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                {Object.keys(conversionRates).map((cur) => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="" disabled>Select category</option>
                {craftCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Craft Image</label>
          <div
            className={`relative flex flex-col items-center justify-center border-2 ${
              dragActive ? "border-indigo-500 bg-indigo-50" : "border-dashed border-gray-300 bg-gray-50"
            } rounded-lg p-6 transition-colors duration-150 cursor-pointer mb-2`}
            onClick={handleImageClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className="text-gray-600">
              Drag & drop an image here, or <span className="text-indigo-600 underline">browse</span>
            </span>
          </div>
          {imageName && (
            <p className="text-sm text-gray-700 mt-1 truncate">{imageName}</p>
          )}
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Update Craft
          </button>
        </div>
      </form>
    </div>
  );
}