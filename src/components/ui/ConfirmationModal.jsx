import React, { useState } from "react";

export default function ConfirmationModal() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-slate-700">
              Tambah Alamat Baru
            </h3>

            {/* Form atau isi modal di sini */}
            <p className="text-sm text-slate-600 mb-4">
              Formulir penambahan alamat bisa disisipkan di sini.
            </p>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Batal
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
