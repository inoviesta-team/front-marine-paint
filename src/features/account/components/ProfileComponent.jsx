import useAuthStore from "@features/auth/zustand/useAuthStore";
import React, { useEffect } from "react";
import UserAddress from "./UserAddress";
import useAddressStore from "../zustand/useAddressStore";

export default function ProfileComponent() {
  const { user } = useAuthStore();

  return (
    <>
      <div className="font-mono min-h-screen bg-gray-50 py-3 container mx-auto px-4 md:px-14 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="lg:sticky lg:top-16 w-full lg:w-1/4 relative mx-auto lg:max-w-xl min-w-0 break-words bg-white mb-6 shadow-lg rounded-xl mt-16">
            <div className="p-4">
              <div className="flex flex-wrap justify-center">
                <div className="w-full flex justify-center">
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
                </div>
              </div>
              <div className="text-center mt-2">
                <h3 className="text-xl text-slate-700 font-bold leading-normal mb-1">
                  {user.name}
                </h3>
                <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* USER ADDRESSES */}
          <div className="rounded-xl w-full lg:w-3/4 min-h-screen">
                <UserAddress/>
          </div>
        </div>
      </div>
    </>
  );
}
