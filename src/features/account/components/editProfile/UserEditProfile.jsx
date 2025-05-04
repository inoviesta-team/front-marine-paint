import MarineButton from "@components/ui/MarineButton";
import ValidationMessage from "@components/ui/ValidationMessage";
import useAuthStore from "@features/auth/zustand/useAuthStore";
import React, { useState } from "react";

export default function UserEditProfile() {
  const { user, editProfile, error } = useAuthStore();

  const [inputUser, setInputUser] = useState({
    name: user.name,
    email: user.email
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
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 w-full shadow-md">
      <h2 className="text-2xl font-semibold text-slate-700 mb-3">
            Edit Profile
          </h2>
          <ValidationMessage  error={error} defaultMessage="Ubah profile gagal! Silahkan coba kembali"/>
          
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
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
        </div>
        <div className="flex justify-end items-center mt-3">
            <MarineButton type="submit">Ubah Profile</MarineButton>
        </div>
      </form>
    </>
  );
}
