const baseUrl = "https://wilayah.id/api"

export const dataWilayahIndonesiaApi = {
    getProvinces: async () => {
        const res = await fetch(`${baseUrl}/provinces.json`, {
            mode: "cors"
        });
        console.log("asasa: ", res);
        
        const provinces = await res;
        console.log("provinces: ", provinces.data);
        
        return provinces;
    },
    getRegencies: async (provinceCode) => {
        const res = await fetch(`${baseUrl}/regencies/${provinceCode}.json`);
        const regencies = await res.json();
        return regencies;
    },
    getDistricts: async (regencyCode) => {
        const res = await fetch(`${baseUrl}/districts/${regencyCode}.json`);
        const districts = await res.json();
        return districts;
    },
    getVillages: async (districtCode) => {
        const res = await fetch(`${baseUrl}/villages/${districtCode}.json`);
        const villages = await res.json();
        return villages;
    }
}