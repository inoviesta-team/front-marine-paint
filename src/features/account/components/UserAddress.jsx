import React, { useState } from "react";
import MarineButton from "@components/ui/MarineButton";
import AddressFormModal from "./AddressFormModal";
import useAuthStore from "@features/auth/zustand/useAuthStore";
import useAddressStore from "../zustand/useAddressStore";

const dummyAddresses = [
  {
    id: 1,
    addressType: "Rumah",
    isDefault: true,
    recipientName: "Budi Santoso",
    phone: "081234567890",
    address: "Jl. Merdeka No. 123",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "12345",
    country: "Indonesia",
    notes: "Depan minimarket",
  },
  {
    id: 2,
    addressType: "Kantor",
    isDefault: false,
    recipientName: "Budi Santoso",
    phone: "081298765432",
    address: "Jl. Sudirman No. 45",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "67890",
    country: "Indonesia",
    notes: "",
  },
];

export default function UserAddress() {
  const { address = [] } = useAddressStore()
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setSelectedAddress({});
    setShowModal(false)
  };

  const handleEditAddressFormModal = (address) => {
    setSelectedAddress(address);
    handleOpenModal();
  }

  // console.log("address: ", address);
  

  return (
    <>
      <div className="bg-white rounded-xl p-6 w-full shadow-md">
        <div className="flex flex-wrap justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold text-slate-700 mb-2 sm:mb-0">
            Daftar Alamat
          </h2>
          <MarineButton onClick={handleOpenModal}>Tambah Alamat</MarineButton>
        </div>

        <div className="space-y-4">
          {address.map((addr) => (
            <button
              onClick={() => handleEditAddressFormModal(addr)}
              key={addr.id}
              className={`w-full text-left p-4 border rounded-lg ${
                addr.isDefault
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-200"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-medium text-slate-700">
                  {addr.recipientName}{" "}
                  {addr.isDefault && (
                    <span className="text-sm text-blue-500">(UTAMA)</span>
                  )}
                </span>
              </div>
              <div className="text-sm text-slate-600 space-y-1">
                <p>
                  <strong>Telepon:</strong> {addr.phone}
                </p>
                <p>
                  <strong>Alamat:</strong> {addr.address}, {addr.city},{" "}
                  {addr.province}, {addr.postalCode}
                </p>
                <p>
                  <strong>Negara:</strong> {addr.country}
                </p>
                {addr.notes && (
                  <p>
                    <strong>Catatan:</strong> {addr.notes}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddressFormModal
          addressObj={selectedAddress}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}
