import useAuthStore from "@features/auth/zustand/useAuthStore";
import { Mail, Phone } from "lucide-react";
import React from "react";

export default function AccountLayout({ children }) {
  const { user, logout } = useAuthStore();

  const url = new URL(window.location.href).pathname;

  return (
    <div className="font-sans min-h-[80vh] bg-gray-50 py-3 md:py-8 container mx-auto px-4 md:px-14 relative z-10">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="lg:sticky lg:top-16 w-full lg:w-1/4 relative mx-auto lg:max-w-xl min-w-0 break-words bg-white mb-6 shadow-lg rounded-xl">
          <div className="p-4">
            <div className="flex flex-wrap justify-center">
              {/* <div className="w-full flex justify-center">
                  <div className="relative">
                    <img
                      src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
                      className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                    />
                  </div>
                </div>
                <div className="w-full text-center mt-20">
                  <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                        12
                      </span>
                      <span className="text-sm text-slate-400">Transaksi</span>
                    </div>
                  </div>
                </div> */}
            </div>
            <div className="px-4 md:px-3 mt-2 mb-6">
              <h3 className="text-xl text-slate-700 font-bold leading-normal mb-1">
                {user.name}
              </h3>
              {user.email && (
                <p className="flex items-center gap-1 text-sm mt-0 mb-1 text-slate-400 font-bold">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </p>
              )}
              {user.phoneNumber && (
                <p className="flex items-center gap-1 text-sm mt-0 mb-2 text-slate-400 font-bold">
                  <Phone size={16} /> <span>{user.phoneNumber}</span>
                </p>
              )}
            </div>
            <nav className="space-y-4 md:px-1">
              <a
                className={`${
                  url === "/account/address" || url === "/account"
                    ? "bg-blue-50 font-medium text-blue-600"
                    : "text-gray-600"
                } p-3 rounded-md block`}
                href="/account/address"
              >
                Alamat
              </a>
              <a
                className={`${
                  url === "/account/edit-profile"
                    ? "bg-blue-50 font-medium text-blue-600"
                    : "text-gray-600"
                } p-3 rounded-md block`}
                href="/account/edit-profile"
              >
                Edit Profile
              </a>
              <a
                className={`${
                  url === "/order"
                    ? "bg-blue-50 font-medium text-blue-600"
                    : "text-gray-600"
                } p-3 rounded-md block`}
                href="/order"
              >
                History Order
              </a>
              <a
                className={`${
                  url === "/account/change-password"
                    ? "bg-blue-50 font-medium text-blue-600"
                    : "text-gray-600"
                } p-3 rounded-md block`}
                href="/account/change-password"
              >
                Ganti Password
              </a>
              <button
                onClick={logout}
                className="p-3 rounded-md block text-red-500"
                href="/account/change-password"
              >
                Keluar / Logout
              </button>
            </nav>
          </div>
        </div>

        <div className="w-full lg:w-3/4 min-h-screen">
          {/* <div className="flex justify-around items-center bg-white rounded-xl p-6 w-full shadow-md mb-3">
              <button
                className={`${tab === 'address' ? 'text-marine-lightBlue font-semibold' : 'text-gray-500 font-medium'}`}
                onClick={() => setTab('address')}
              >
                Alamat
              </button>
              <button
                className={`${tab === 'editProfile' ? 'text-marine-lightBlue font-semibold' : 'text-gray-500 font-medium'}`}
                onClick={() => setTab('editProfile')}
              >
                Edit Profile
              </button>
              <button
                className={`${tab === 'changePassword' ? 'text-marine-lightBlue font-semibold' : 'text-gray-500 font-medium'}`}
                onClick={() => setTab('changePassword')}
              >
                Ubah Password
              </button>
            </div> */}
          {/* USER ADDRESSES */}
          <div className="rounded-xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
