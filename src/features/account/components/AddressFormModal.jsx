import MarineButton from "@components/ui/MarineButton";
import { MapPin, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { dataWilayahIndonesiaApi } from "../api/dataWilayahIndonesiaApi";
import indonesiaCities from "../../../../public/json/indonesiaCities.json";
import indonesiaProvinces from "../../../../public/json/indonesiaProvinces.json";
import useAddressStore from "../zustand/useAddressStore";
import useAuthStore from "@features/auth/zustand/useAuthStore";

export default function AddressFormModal({ addressObj = {}, showModal, handleCloseModal }) {
  const [isDefault, setIsDefault] = useState(addressObj?.id ? addressObj.isDefault : false);
  const { createAddress, updateAddress } = useAddressStore();
  const { user } = useAuthStore()

  let provincesData = Object.entries(indonesiaProvinces).map(
    ([id, province]) => ({
      id,
      province: province
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    })
  );

  // SELECTED DATA
  const selectedProvinceData = addressObj?.province && provincesData.filter((data, _) => data.province === addressObj?.province)[0].id || ""
  const selectedProvinceNameData = addressObj?.province || ""
  const selectedRegencyData = addressObj?.city || ""
  const selectedPostalCodeData = addressObj?.postalCode || ""
  const selectedDistrictData = addressObj?.id ?
    indonesiaCities.filter((data, _) => data.postal_code === selectedPostalCodeData)[0]?.sub_district : ""

  // DATA JSON
  const regencyAddrObj = addressObj?.id ? [
    ...new Set(
      indonesiaCities
        .filter((data, _) => data.province_code === selectedProvinceData)
        .map((data, _) => data.city)
    ),
  ].sort() : []

  const districtAddrObj = addressObj?.id ? [
    ...new Set(
      indonesiaCities
        .filter((data, _) => data.city === selectedRegencyData)
        .map((data, _) => data.sub_district)
    ),
  ].sort() : []

  const postalAddrObj = addressObj?.id ? [
    ...new Set(
      indonesiaCities
        .filter((data, _) => data.sub_district === selectedDistrictData)
        .map((data, _) => data.postal_code)
    ),
  ].sort() : []

  const [selectedProvince, setSelectedProvince] = useState(selectedProvinceData);
  const [selectedProvinceName, setSelectedProvinceName] = useState(selectedProvinceNameData);
  const [selectedRegency, setSelectedRegency] = useState(selectedRegencyData);
  const [selectedDistrict, setSelectedDistrict] = useState(selectedDistrictData);
  const [selectedPostalCode, setSelectedPostalCode] = useState(selectedPostalCodeData);

  const [provinces, setProvinces] = useState(provincesData);
  // console.log("provinces: ", provinces);

  // Kabupaten / Kota
  const [regencies, setRegencies] = useState(regencyAddrObj);
  // console.log("regencies: ", regencies);

  // Kecamatan
  const [districts, setDistricts] = useState(districtAddrObj);
  // console.log("districts: ", districts);

  // KODE POS
  const [postalCodes, setPostalCodes] = useState(postalAddrObj);
  // console.log("postalCodes: ", postalCodes);

  const handleSelectedProvince = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedProvinceName(e.target.options[e.target.selectedIndex].text);

    setRegencies([]);
    setSelectedRegency("");

    setDistricts([]);
    setSelectedDistrict("");

    setPostalCodes([]);
    setSelectedPostalCode("");

    setRegencies(
      [
        ...new Set(
          indonesiaCities
            .filter((data, _) => data.province_code === e.target.value)
            .map((data, _) => data.city)
        ),
      ].sort()
    );
    setSelectedRegency("");
  };

  const handleSelectedRegency = (e) => {
    setSelectedRegency(e.target.value);
    setDistricts(
      [
        ...new Set(
          indonesiaCities
            .filter((data, _) => data.city === e.target.value)
            .map((data, _) => data.sub_district)
        ),
      ].sort()
    );
    setSelectedDistrict("");

    setPostalCodes([]);
    setSelectedPostalCode("");
  };

  const handleSelectedDistrict = (e) => {
    setSelectedDistrict(e.target.value);

    setPostalCodes(
      [
        ...new Set(
          indonesiaCities
            .filter((data, _) => data.sub_district === e.target.value)
            .map((data, _) => data.postal_code)
        ),
      ].sort()
    );
    setSelectedPostalCode("");
  };

  const handleSelectedPostalCode = (e) => {
    setSelectedPostalCode(e.target.value);
  };

  // INPUT ADDRESS
  const [inputAddress, setInputAddress] = useState({
    addressType: "SHIPPING",
    country: "Indonesia",
    recipientName: addressObj?.id ? addressObj.recipientName  : user.name,
    phone: addressObj?.id ? addressObj.phone  : user.phoneNumber,
    address: addressObj?.address ?? "",
    notes: addressObj?.notes ?? "",
  });

  const handleInputAddressChange = (e) => {
    setInputAddress({
      ...inputAddress,
      [e.target.name]: e.target.value,
    });
  };

  // console.log("selectedProvinceName: ", selectedProvinceName);
  // console.log("selectedRegency: ", selectedRegency);
  // console.log("selectedDistrict: ", selectedDistrict);
  // console.log("selectedPostalCode: ", selectedPostalCode);
  // console.log("inputAddress: ", inputAddress);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      ...inputAddress,
      province: selectedProvinceName,
      city: selectedRegency,
      postalCode: selectedPostalCode,
      isDefault
    }

    // console.log("requestData: ", requestData);

    if(addressObj?.id) {
      await updateAddress(addressObj.id, requestData)
    } else {
      await createAddress(requestData)
    }

    setInputAddress({
      addressType: "SHIPPING",
      country: "Indonesia",
      recipientName: "",
      phone: "",
      address: "",
      notes: "",
    })
    setSelectedProvince("")
    setSelectedProvinceName("")
    setSelectedRegency("")
    setSelectedDistrict("")
    setSelectedPostalCode("")
    setIsDefault(false)
    handleCloseModal()
  }
  

  return (
    <>
      {showModal && (
        <div className="overflow-y-scroll xl:overflow-y-hidden fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 md:py-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 sm:p-6 w-full h-auto sm:h-auto max-w-3xl shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-slate-700">
                {addressObj?.id ? "Ubah Alamat" : "Tambah Alamat Baru"}
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={handleCloseModal}
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <div
                onClick={() => setIsDefault((prev) => !prev)}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer border transition-all duration-300 ${
                  isDefault
                    ? "bg-marine-blue text-white"
                    : "bg-white text-slate-600 border"
                }`}
              >
                <div>
                  <div className="text-sm font-bold capitalize">
                    {isDefault ? "Alamat Utama" : "Jadikan alamat utama"}
                  </div>
                  <div className="text-xs">
                    {isDefault
                      ? "Alamat ini akan digunakan sebagai alamat utama"
                      : "Klik untuk menjadikan alamat utama"}
                  </div>
                </div>
                <div className="text-xl">
                  <MapPin />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    name="recipientName"
                    value={inputAddress.recipientName}
                    onChange={handleInputAddressChange}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={inputAddress.phone}
                    onChange={handleInputAddressChange}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Alamat
                </label>
                <textarea
                  name="address"
                  rows="3"
                  value={inputAddress.address}
                  onChange={handleInputAddressChange}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="Nama jalan, nomor rumah, patokan, dll."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Provinsi
                  </label>
                  <select
                    name="province"
                    className="w-full p-2 border rounded text-sm"
                    onChange={handleSelectedProvince}
                    defaultValue={selectedProvince}
                  >
                    <option value="">-- Pilih Provinsi --</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.province}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Kota
                  </label>
                  <select
                    name="city"
                    className="w-full p-2 border rounded text-sm"
                    onChange={handleSelectedRegency}
                    defaultValue={selectedRegency}
                    disabled={selectedProvince === ""}
                  >
                    <option value="">-- Pilih Kota --</option>
                    {regencies.map((regency, index) => (
                      <option key={`regency-${index}`} value={regency}>
                        {regency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Kecamatan
                  </label>
                  <select
                    name="district"
                    className="w-full p-2 border rounded text-sm"
                    onChange={handleSelectedDistrict}
                    defaultValue={selectedDistrict}
                    disabled={selectedRegency === ""}
                  >
                    <option value="">-- Pilih Kecamatan --</option>
                    {districts.map((district, index) => (
                      <option key={`district-${index}`} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Kode Pos
                  </label>
                  <select
                    name="postalCode"
                    className="w-full p-2 border rounded text-sm"
                    onChange={handleSelectedPostalCode}
                    defaultValue={selectedPostalCode}
                    disabled={selectedDistrict === ""}
                  >
                    <option value="">-- Pilih Kode Pos --</option>
                    {postalCodes.map((postalCode, index) => (
                      <option key={`postal-code-${index}`} value={postalCode}>
                        {postalCode}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Negara
                  </label>
                  <input
                    type="text"
                    name="country"
                    className="w-full p-2 border rounded text-sm"
                    defaultValue="Indonesia"
                    disabled
                  />
                </div> */}
              </div>

              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Catatan
                </label>
                <textarea
                  name="notes"
                  rows="2"
                  className="w-full p-2 border rounded text-sm"
                  placeholder="Contoh: Dekat pintu gerbang atau sebelah minimarket"
                  value={inputAddress.notes}
                  onChange={handleInputAddressChange}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-3">
              <MarineButton className="rounded-lg" onClick={handleCloseModal} variant="tertiary">
                Batal
              </MarineButton>
              <MarineButton className="rounded-lg" type="submit">Simpan</MarineButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
