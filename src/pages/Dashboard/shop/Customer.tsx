import React, { useState } from "react";
import { useGetCustomersQuery } from "../../../redux/services/artWork/artworkApi";

// Types
export type Customer = {
  _id: string;
  artwork: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export type Size = {
  width: number;
  height: number;
  unit: string;
};

export type Artwork = {
  _id: string;
  title: string;
  artist: string;
  medium: string;
  price: number;
  order: number;
  description: string;
  size: Size;
  email: string;
  website: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  customers?: Customer[];
};

const Customer: React.FC = () => {
  const { data, error, isLoading } = useGetCustomersQuery(undefined);
  const [expandedArtwork, setExpandedArtwork] = useState<string | null>(null);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading data</p>;

  const toggleCustomerList = (artworkId: string) => {
    setExpandedArtwork(prev => (prev === artworkId ? null : artworkId));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Artwork & Customers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((artwork: Artwork) => (
          <div
            key={artwork._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-32 h-32 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold mb-2">{artwork.title}</h2>

            <button
              onClick={() => toggleCustomerList(artwork._id)}
              className="px-3 py-1 mb-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              {expandedArtwork === artwork._id ? "Hide Customers" : "Show Customers"}
            </button>

            <p className="text-sm text-gray-500 mb-2">
              Customers: {artwork.customers?.length || 0}
            </p>

            {expandedArtwork === artwork._id && artwork.customers?.length ? (
              <ul className="w-full border-t border-gray-200 mt-2 pt-2 space-y-1">
                {artwork.customers.map(customer => (
                  <li
                    key={customer._id}
                    className="flex justify-between text-sm text-gray-700 px-2"
                  >
                    <span>{customer.name}</span>
                    <span>{customer.phone}</span>
                  </li>
                ))}
              </ul>
            ) : expandedArtwork === artwork._id ? (
              <p className="text-sm text-gray-400 mt-2">No customers yet</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;