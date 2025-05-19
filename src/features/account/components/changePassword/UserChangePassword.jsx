import MarineButton from "@components/ui/MarineButton";
import ValidationMessage from "@components/ui/ValidationMessage";
import useAuthStore from "@features/auth/zustand/useAuthStore";
import useModalStore from "@features/modal/zustand/useModalStore";
import { Eye, EyeOff, Lock } from "lucide-react";
import React, { useState } from "react";

export default function UserChangePassword() {
  const { showModal: showModalStore, hideModal: hideModalStore } = useModalStore();
  const { user, editProfile, error, setError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [inputUser, setInputUser] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputUserChange = (e) => {
    setInputUser({
      ...inputUser,
      [e.target.name]: e.target.value,
    });
  };

  const validateChangePassword = () => {
    if(!inputUser.newPassword || inputUser.newPassword == "") {
      showModalStore(
          "INFO",
          "DEFAULT",
          "Silahkan isi password baru terlebih dahulu",
          null,
          "Tutup",
          null
        )
        return false
      }

    if(!inputUser.confirmNewPassword || inputUser.confirmNewPassword == "") {
      showModalStore(
          "INFO",
          "DEFAULT",
          "Silahkan isi konfirmasi password terlebih dahulu",
          null,
          "Tutup",
          null
        )
        return false
      }
      
      if(inputUser.newPassword !== inputUser.confirmNewPassword) {
        showModalStore(
            "INFO",
            "DEFAULT",
            "Password baru dan konfirmasi password baru tidak sama",
            null,
            "Tutup",
            null
          )
          return false
        }

        return true
    }
    
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateChangePassword()) return

    if (inputUser.newPassword !== inputUser.confirmNewPassword) {
      setError({
        response: {
          data: {
            message: "Password baru dan konfirmasi password baru tidak sama",
            data: {
              validationErrors: null,
            },
          },
        },
      });
      return;
    }

    const request = {
      name: user.name,
      email: user.email,
      phoneNumber: user?.phoneNumber,
      password: inputUser.newPassword
    }

    await editProfile(request);
    setInputUser({
      newPassword: "",
      confirmNewPassword: "",
    })
    setError(null);

    showModalStore(
      "INFO",
      "SUCCESS",
      "Ubah Password Berhasil!",
      null,
      "Tutup",
      null
    )
  };

  console.log("error: ", error);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-6 w-full shadow-md"
    >
      <h2 className="text-2xl font-semibold text-slate-700 mb-3">
        Ganti Password
      </h2>
      <ValidationMessage
        error={error}
        defaultMessage="Ganti password gagal! Silahkan coba kembali"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Password Baru
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={inputUser.newPassword}
              onChange={handleInputUserChange}
              className="w-full p-2 border rounded text-sm"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Konfirmasi Password Baru
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            value={inputUser.confirmNewPassword}
            onChange={handleInputUserChange}
            className="w-full p-2 border rounded text-sm"
            placeholder="••••••••"
          />
        </div>
      </div>
      <div className="flex justify-end items-center mt-3">
        <MarineButton className="rounded-lg" type="submit">Ubah Password</MarineButton>
      </div>
    </form>
  );
}
