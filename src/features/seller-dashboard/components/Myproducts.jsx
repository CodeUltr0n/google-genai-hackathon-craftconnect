import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, subtitle, onAddNew }) => {
    return (
    <div className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>
        {/* 3. The button now calls the function passed via props to open the modal. */}
        <button onClick={onAddNew} type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200
         hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium 
        rounded-lg text-sm px-5 py-2.5 
        text-center me-2 mb-2">Add New Craft
        </button>
    </div>
    );
};

const Myproducts = ()=>{
    const [products,setProducts] = useState([]);
    const[isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchProducts = async()=>{
            // const response = await fetch(`/api/seller/products`);
            // await response.json();
        

        /// mock data for testing 
        const MockdatafromDB = [
           { id: 'prod_123', name: 'Blue Pottery Vase', price: 2500, stock: 15, status: 'Active', imageUrl: '/images/Blue pottery.jpeg' },
              { id: 'prod_124', name: 'Bandhani Silk Dupatta', price: 3200, stock: 8, status: 'Active', imageUrl: '/images/Bandhani Silk Dupatta.jpeg' },
              { id: 'prod_125', name: 'Chikankari Kurta', price: 2800, stock: 22, status: 'Active', imageUrl: '/images/Chikankari Kurta.jpeg' },
              { id: 'prod_126', name: 'Kutch Mirror Work Bag', price: 1800, stock: 0, status: 'Sold Out', imageUrl: '/images/Kutch Mirror Work Bag.jpeg' },
        ]

        setProducts(MockdatafromDB);
        setIsLoading(false);
    };

    fetchProducts();
    },[]);


    if(isLoading){
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <svg className="animate-spin h-10 w-10 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <div className="text-gray-700 text-lg font-medium">Loading Products...</div>
            </div>
        );
    }

    return(
    <div>
      <PageHeader title="My Craft Listings" subtitle="Manage your inventory and product details." onAddNew={() => navigate('/seller-form')} />

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-5 gap-4 border-b border-gray-200 pb-3 mb-4 text-gray-500 font-semibold text-sm">
          <div>Product</div>
          <div className="text-center">Price</div>
          <div className="text-center">Stock</div>
          <div className="text-center">Status</div>
          <div className="text-center">Actions</div>
        </div>
        <div className="divide-y divide-gray-200">
          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-5 gap-4 items-center py-4 hover:bg-gray-50 rounded-md transition"
            >
              {/* Product */}
              <div className="flex items-center space-x-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-16 w-16 rounded-md object-cover shadow-sm"
                />
                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-500">ID: {product.id}</p>
                </div>
              </div>

              {/* Price */}
              <div className="text-center text-gray-700 font-medium">
                ₹{product.price.toLocaleString("en-IN")}
              </div>

              {/* Stock */}
              <div className={`text-center ${
                product.stock > 0 ? "text-gray-600" : "text-red-500 font-semibold"
              }`}>
                {product.stock > 0 ? `${product.stock} units` : "Out of Stock"}
              </div>

              {/* Status */}
              <div className="text-center">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    product.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {product.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-center space-x-3">
                <button className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Edit
                </button>
                <button className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    )
};
export default Myproducts;