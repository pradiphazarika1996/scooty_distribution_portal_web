export const DISTRICTS = Object.freeze({
  Bajali: 1,
  Baksa: 2,
  Barpeta: 3,
  Biswanath: 4,
  Bongaigaon: 5,
  Cachar: 6,
  Charaideo: 7,
  Chirang: 8,
  Darrang: 9,
  Dhemaji: 10,
  Dhubri: 11,
  Dibrugarh: 12,
  Goalpara: 13,
  Golaghat: 14,
  Hailakandi: 15,
  Hojai: 16,
  Jorhat: 17,
  Kamrup_Metro: 18,
  Kamrup: 19,
  Karbi_Anglong: 20,
  Kokrajhar: 21,
  Lakhimpur: 22,
  Majuli: 23,
  Morigaon: 24,
  Nagaon: 25,
  Nalbari: 26,
  Sivasagar: 27,
  Sonitpur: 28,
  South_Salmara_Mankachar: 29,
  Sribhumi: 30,
  Tamulpur: 31,
  Tinsukia: 32,
  Udalguri: 33,
  West_Karbi_Anglong: 34,
  Dima_Hasao: 35,
});

export const DISTRICT_OPTIONS = Object.entries(DISTRICTS).map(
  ([label, value]) => ({
    label: label.replace(/_/g, " "),
    value,
  }),
);

export function getDistrictName(value: number) {
  const option = DISTRICT_OPTIONS.find((opt) => opt.value === value);
  return option ? option.label : "Unknown District";
}

export const REGISTRATION_SESSION_OPTIONS = [
  { label: "2020-2021", value: "2020-2021" },
  { label: "2021-2022", value: "2021-2022" },
  { label: "2022-2023", value: "2022-2023" },
  { label: "2023-2024", value: "2023-2024" },
  { label: "2024-2025", value: "2024-2025" },
  { label: "2025-2026", value: "2025-2026" },
  { label: "2026-2027", value: "2026-2027" },
];
