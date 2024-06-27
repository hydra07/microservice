import { set } from "date-fns";
import { useState, useEffect } from "react";

interface DistrictOption {
  district_id: string;
  district_name: string;
  district_type: string;
}

interface WardOption {
  ward_id: string;
  ward_name: string;
  ward_type: string;
}

interface ProvinceOption {
  province_id: string;
  province_name: string;
  province_type: string;
}

export const useAddressData = () => {
//   const [provinces, setProvinces] = useState<ProvinceOption[]>([]);
  const [districts, setDistricts] = useState<DistrictOption[]>([]);
  const [wards, setWards] = useState<WardOption[]>([]);

  useEffect(() => {
    // fetchProvinces();
    fetchDistricts("48");
  }, []);

//   const fetchProvinces = async () => {
//     try {
//       const response = await fetch("https://vapi.vnappmob.com/api/province/");
//       const data = await response.json();
//       setProvinces(data.results);
//     } catch (error) {
//       console.error("Error fetching provinces:", error);    
//     }
//   };

  const fetchDistricts = async (provinceId: string) => {
    try {
      const response = await fetch(
        `https://vapi.vnappmob.com/api/province/district/${provinceId}`
      );
      const data = await response.json();
      setDistricts(data.results);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchWards = async (districtId: string) => {
    try {
      const response = await fetch(
        `https://vapi.vnappmob.com/api/province/ward/${districtId}`
      );
      const data = await response.json();
      setWards(data.results);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  return { districts, wards, fetchDistricts, fetchWards };
};
