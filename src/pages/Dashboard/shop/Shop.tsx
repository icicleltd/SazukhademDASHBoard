import { useState } from "react";
import {
  useCreateArtworkMutation,
  useGetShopQuery,
} from "../../../redux/services/artWork/artworkApi";
type ShopItem = {
  _id: string;
  title: string;
  artist: string;
  medium: string;
  price: number;
  order: number;
  description: string;
  size: { width: number; height: number; unit: string };
  email: string;
  website: string;
  image: string; // URL
  createdAt: string;
  updatedAt: string;
};

export default function Shop() {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    medium: "",
    price: 0,
    order: 0,
    description: "",
    width: 0,
    height: 0,
    unit: "inch",
    email: "",
    website: "",
    image: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const [createArtwork, { isLoading: isSubmitting }] =
    useCreateArtworkMutation();
  const { data: shop, isLoading, refetch } = useGetShopQuery(undefined);
  const shopItems: ShopItem[] | undefined = shop?.data;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setForm({
        ...form,
        image: file,
      });

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1️⃣ Validate all fields
    const {
      title,
      artist,
      medium,
      price,
      order,
      description,
      width,
      height,
      unit,
      email,
      website,
      image,
    } = form;

    if (
      !title ||
      !artist ||
      !medium ||
      !price ||
      !order ||
      !description ||
      !width ||
      !height ||
      !unit ||
      !email ||
      !website ||
      !image
    ) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("artist", form.artist);
    formData.append("medium", form.medium);
    formData.append("price", String(form.price));
    formData.append("order", String(form.order));
    formData.append("description", form.description);
    formData.append("width", String(form.width));
    formData.append("height", String(form.height));
    formData.append("unit", form.unit);
    formData.append("email", form.email);
    formData.append("website", form.website);

    if (form.image) formData.append("image", form.image);

    try {
      await createArtwork(formData).unwrap();
      alert("Artwork submitted successfully!");
      // 3️⃣ Reset form and image preview
      setForm({
        title: "",
        artist: "",
        medium: "",
        price: 0,
        order: 0,
        description: "",
        width: 0,
        height: 0,
        unit: "inch",
        email: "",
        website: "",
        image: null,
      });
      setPreview(null);
      refetch(); // 2️⃣ refresh shop data after new artwork
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Shop</h1>

      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-3"
        >
          <h2 className="text-lg font-semibold text-gray-700">Add Artwork</h2>

          {/* Image Preview */}
          <div className="mb-4">
            {/* Image Preview */}
            {preview ? (
              <div className="relative w-full h-48 mb-2 border rounded overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <span
                  className="absolute top-1 right-2 text-xs bg-black text-white px-1 rounded cursor-pointer"
                  onClick={() => {
                    setPreview(null);
                    setForm({ ...form, image: null });
                  }}
                >
                  Remove
                </span>
              </div>
            ) : (
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-500 hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-500 text-sm">
                  Click to upload image
                </span>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <input
            required
            name="title"
            value={form.title}
            placeholder="Title"
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
          />

          <input
            required
            name="artist"
            value={form.artist}
            placeholder="Artist"
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
          />

          <input
            required
            name="medium"
            value={form.medium}
            placeholder="Medium"
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              required
              name="price"
              value={form.price}
              type="number"
              placeholder="Price"
              onChange={handleChange}
              className="border rounded p-2 text-sm"
            />

            <input
              required
              name="order"
              type="number"
              placeholder="Order"
              value={form.order}
              onChange={handleChange}
              className="border rounded p-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <input
              required
              name="width"
              type="number"
              placeholder="Width"
              value={form.width}
              onChange={handleChange}
              className="border rounded p-2 text-sm"
            />

            <input
              name="height"
              type="number"
              placeholder="Height"
              value={form.height}
              onChange={handleChange}
              className="border rounded p-2 text-sm"
            />

            <select
              name="unit"
              onChange={handleChange}
              value={form.unit}
              className="border rounded p-2 text-sm"
            >
              <option value="inch">inch</option>
              <option value="cm">cm</option>
            </select>
          </div>

          <textarea
            required
            name="description"
            placeholder="Description"
            rows={3}
            onChange={handleChange}
            value={form.description}
            className="w-full border rounded p-2 text-sm"
          />

          <input
            required
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            className="w-full border rounded p-2 text-sm"
          />

          <input
            required
            name="website"
            placeholder="Website"
            onChange={handleChange}
            value={form.website}
            className="w-full border rounded p-2 text-sm"
          />

          <button
            type="submit"
            disabled={isSubmitting} // disable while submitting
            className={`w-full py-2 rounded text-sm text-white ${
              isSubmitting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {isSubmitting ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Shop List */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {shopItems && shopItems.length > 0 ? (
            shopItems.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Artwork Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />

                {/* Artwork Info */}
                <div className="p-4 space-y-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600">Artist: {item.artist}</p>
                  <p className="text-sm text-gray-600">Medium: {item.medium}</p>
                  <p className="text-sm text-gray-600">
                    Size: {item.size.width} x {item.size.height}{" "}
                    {item.size.unit}
                  </p>
                  <p className="text-sm text-gray-600">Price: ${item.price}</p>
                  <p className="text-sm text-gray-600">Order: {item.order}</p>
                  <p className="text-sm text-gray-600">Email: {item.email}</p>
                  <p className="text-sm text-gray-600">
                    Website: {item.website}
                  </p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items in the shop</p>
          )}
        </div>
      )}
    </>
  );
}
