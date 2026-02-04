import React, { useEffect, useState } from "react";
const API = import.meta.env.VITE_API;

export default function ClubData() {
  const [clubs, setClubs] = useState([]);
  const [editingClub, setEditingClub] = useState(null);
  const [updatedClub, setUpdatedClub] = useState({
    name: "",
    location: "",
    country: "",
    locationCoordinates: "",
    description: "",
    email: "",
    contact: "",
    bookinglink: "",
    clubimageUrl: "", // Cloudinary URL string
    logoimageUrl: "", // Cloudinary URL string
  });

  useEffect(() => {
    fetch(`${API}/clublist/all`)
      .then((res) => res.json())
      .then((data) => setClubs(data))
      .catch((error) => console.error("Error fetching club data:", error));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this club?")) return;

    try {
      const response = await fetch(`${API}/clublist/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setClubs(clubs.filter((club) => club._id !== id));
        alert("Club deleted successfully.");
      } else {
        alert("Failed to delete the club.");
      }
    } catch (error) {
      console.error("Error deleting club:", error);
      alert("Server error. Try again.");
    }
  };

  const handleEdit = (club) => {
    console.log("Editing club:", club);
    setEditingClub(club._id);
    setUpdatedClub({
      name: club.name,
      location: club.location,
      country: club.country,
      locationCoordinates: club.locationCoordinates.join(", "),
      description: club.description,
      email: club.email || "",
      contact: club.contact || "",
      bookinglink: club.bookinglink || "",
      clubimageUrl: club.clubimageUrl, // Keep current Cloudinary URL
      logoimageUrl: club.logoimageUrl, // Keep current Cloudinary URL
    });
  };

  const handleChange = (e) => {
    setUpdatedClub({ ...updatedClub, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      // Validate and parse coordinates
      const coords = updatedClub.locationCoordinates
        .split(",")
        .map((c) => parseFloat(c.trim()))
        .filter((c) => !isNaN(c));

      if (coords.length !== 2) {
        alert("Invalid coordinates format. Please use: lat, lon");
        return;
      }

      // Build payload as regular JavaScript object
      const payload = {
        name: updatedClub.name,
        location: updatedClub.location,
        country: updatedClub.country,
        description: updatedClub.description,
        locationCoordinates: coords, // Send as array directly
        clubimageUrl: updatedClub.clubimageUrl,
        logoimageUrl: updatedClub.logoimageUrl,
        email: updatedClub.email,
        contact: updatedClub.contact,
        bookinglink: updatedClub.bookinglink,
      };

      console.log("Sending payload:", payload);

      const response = await fetch(`${API}/clublist/update/${editingClub}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // ← IMPORTANT: JSON header
        },
        body: JSON.stringify(payload), // ← Send as JSON string
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("Update successful:", updatedData);

        setClubs(
          clubs.map((club) =>
            club._id === editingClub ? updatedData.club : club,
          ),
        );
        setEditingClub(null);
        alert("Club updated successfully!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Update failed:", errorData);
        alert(`Failed to update: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating club:", error);
      alert(`Error: ${error.message}`);
    }
  };

  /* ALTERNATIVE OPTION 2: Using JSON (simpler, recommended if not uploading files)
  const handleUpdateJSON = async () => {
    try {
      const coords = updatedClub.locationCoordinates
        .split(",")
        .map((c) => parseFloat(c.trim()))
        .filter((c) => !isNaN(c));

      if (coords.length !== 2) {
        alert("Invalid coordinates format. Please use: lat, lon");
        return;
      }

      const updatePayload = {
        name: updatedClub.name,
        location: updatedClub.location,
        country: updatedClub.country,
        description: updatedClub.description,
        locationCoordinates: coords, // Send as array directly
        clubimageUrl: updatedClub.clubimageUrl,
        logoimageUrl: updatedClub.logoimageUrl,
        email: updatedClub.email,
        contact: updatedClub.contact,
        bookinglink: updatedClub.bookinglink,
      };

      console.log("Sending update:", updatePayload);

      const response = await fetch(`${API}/clublist/update/${editingClub}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setClubs(
          clubs.map((club) =>
            club._id === editingClub ? updatedData.club : club
          )
        );
        setEditingClub(null);
        alert("Club updated successfully.");
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to update: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating club:", error);
      alert(`Error: ${error.message}`);
    }
  };
  */

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-semibold mb-4">Club List</h2>

      {clubs.length === 0 ? (
        <p className="text-gray-500">No clubs found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="bg-white p-4 border border-gray-300 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-800">{club.name}</h3>
              <img
                src={club.clubimageUrl}
                alt="Club"
                className="w-full h-40 object-cover mt-2 rounded"
              />
              <img
                src={club.logoimageUrl}
                alt="Logo"
                className="w-20 h-20 object-contain mt-2"
              />
              <p className="text-gray-600 mt-2">{club.description}</p>
              <p className="mt-2">
                📍 <strong>{club.location}</strong>, {club.country}
              </p>
              <p>
                📌 Coordinates:{" "}
                {club.locationCoordinates
                  ? `[${club.locationCoordinates.join(", ")}]`
                  : "N/A"}
              </p>
              {club.email && <p>📧 {club.email}</p>}
              {club.contact && <p>📞 {club.contact}</p>}
              {club.bookinglink && (
                <p className="text-blue-500 underline">
                  <a
                    href={club.bookinglink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Now
                  </a>
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                🕒 Created:{" "}
                {club.createdAt
                  ? new Date(club.createdAt).toLocaleString()
                  : "N/A"}
              </p>

              <div className="mt-4 flex justify-between">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(club._id)}
                >
                  🗑️ Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => handleEdit(club)}
                >
                  ✏️ Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Form Modal */}
      {editingClub && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Update Club</h2>

            <label className="block mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={updatedClub.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <label className="block mt-2">Location *</label>
            <input
              type="text"
              name="location"
              value={updatedClub.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <label className="block mt-2">Country *</label>
            <input
              type="text"
              name="country"
              value={updatedClub.country}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <label className="block mt-2">Coordinates (lat, lon) *</label>
            <input
              type="text"
              name="locationCoordinates"
              value={updatedClub.locationCoordinates}
              onChange={handleChange}
              placeholder="e.g., 28.6139, 77.2090"
              className="w-full p-2 border rounded"
              required
            />

            <label className="block mt-2">Description *</label>
            <textarea
              name="description"
              value={updatedClub.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
              required
            ></textarea>

            <label className="block mt-2">Email</label>
            <input
              type="email"
              name="email"
              value={updatedClub.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-2">Contact *</label>
            <input
              type="text"
              name="contact"
              value={updatedClub.contact}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <label className="block mt-2">Booking Link</label>
            <input
              type="url"
              name="bookinglink"
              value={updatedClub.bookinglink}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full p-2 border rounded"
            />

            <label className="block mt-2">Club Image URL (Cloudinary) *</label>
            <input
              type="text"
              name="clubimageUrl"
              value={updatedClub.clubimageUrl}
              onChange={handleChange}
              placeholder="https://res.cloudinary.com/..."
              className="w-full p-2 border rounded"
              required
            />
            {updatedClub.clubimageUrl && (
              <img
                src={updatedClub.clubimageUrl}
                alt="Club Preview"
                className="w-full h-32 mt-2 object-cover rounded"
              />
            )}

            <label className="block mt-2">Logo Image URL (Cloudinary) *</label>
            <input
              type="text"
              name="logoimageUrl"
              value={updatedClub.logoimageUrl}
              onChange={handleChange}
              placeholder="https://res.cloudinary.com/..."
              className="w-full p-2 border rounded"
              required
            />
            {updatedClub.logoimageUrl && (
              <img
                src={updatedClub.logoimageUrl}
                alt="Logo Preview"
                className="w-24 h-24 mt-2 object-contain rounded"
              />
            )}

            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                onClick={() => setEditingClub(null)}
              >
                ❌ Cancel
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                onClick={handleUpdate}
              >
                ✅ Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
