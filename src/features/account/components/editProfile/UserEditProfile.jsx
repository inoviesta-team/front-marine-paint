import MarineButton from "@components/ui/MarineButton";
import ValidationMessage from "@components/ui/ValidationMessage";
import useAuthStore from "@features/auth/zustand/useAuthStore";
import useModalStore from "@features/modal/zustand/useModalStore";
import React, { useState } from "react";

export default function UserEditProfile() {
  const { showModal: showModalStore, hideModal: hideModalStore } = useModalStore();
  const { user, editProfile, error } = useAuthStore();

  const [inputUser, setInputUser] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber
  });

  const handleInputUserChange = (e) => {
    setInputUser({
      ...inputUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await editProfile(inputUser);

    showModalStore(
      "INFO",
      "SUCCESS",
      "Ubah Profile Berhasil!",
      null,
      "Tutup",
      null
    )
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 w-full shadow-md">
      <h2 className="text-2xl font-semibold text-slate-700 mb-3">
            Edit Profile
          </h2>
          <ValidationMessage  error={error} defaultMessage="Ubah profile gagal! Silahkan coba kembali"/>
          
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-1">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              value={inputUser.name}
              onChange={handleInputUserChange}
              className="w-full p-2 border rounded text-sm"
              placeholder="Masukkan nama kamu..."
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input
              type="mail"
              name="email"
              value={inputUser.email}
              onChange={handleInputUserChange}
              className="w-full p-2 border rounded text-sm"
              placeholder="Masukkan email kamu..."
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Telepon</label>
            <input
              type="tel"
              name="phoneNumber"
              value={inputUser.phoneNumber}
              onChange={handleInputUserChange}
              className="w-full p-2 border rounded text-sm"
              placeholder="Masukkan nomor telepon kamu..."
            />
          </div>
        </div>
        <div className="flex justify-end items-center mt-3">
            <MarineButton className="rounded-lg" type="submit">Ubah Profile</MarineButton>
        </div>
      </form>
    </>
  );
}
