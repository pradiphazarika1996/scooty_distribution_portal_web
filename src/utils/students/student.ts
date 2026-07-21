export const DISTRICTS = Object.freeze({
  Baksa: 1,
  Barpeta: 2,
  Biswanath: 3,
  Bongaigaon: 4,
  Cachar: 5,
  Charaideo: 6,
  Chirang: 7,
  Darrang: 8,
  Dhemaji: 9,
  Dhubri: 10,
  Dibrugarh: 11,
  Dima_Hasao: 12,
  Goalpara: 13,
  Golaghat: 14,
  Hailakandi: 15,
  Hojai: 16,
  Jorhat: 17,
  Kamrup: 18,
  Kamrup_Metropolitan: 19,
  Karbi_Anglong: 20,
  Karimganj: 21,
  Kokrajhar: 22,
  Lakhimpur: 23,
  Majuli: 24,
  Morigaon: 25,
  Nagaon: 26,
  Nalbari: 27,
  Sivasagar: 28,
  Sonitpur: 29,
  South_Salmara_Mankachar: 30,
  Tinsukia: 31,
  Udalguri: 32,
  West_Karbi_Anglong: 33,
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
