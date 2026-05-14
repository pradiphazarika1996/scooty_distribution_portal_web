export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterStats {
  districts: number;
  constituencies: number;
  villages: number;
}

export interface MasterFilterProps {
  filterStats: FilterStats;
  districtOptions: FilterOption[];
  constituencyOptions: FilterOption[];
  panchayatOptions: FilterOption[];
  villageOptions: FilterOption[];
  selectedDistrict?: string;
  selectedConstituency?: string;
  selectedPanchayat?: string;
  selectedVillage?: string;
  matchCount?: number;
  onDistrictChange: (value: string | undefined) => void;
  onConstituencyChange: (value: string | undefined) => void;
  onPanchayatChange: (value: string | undefined) => void;
  onVillageChange: (value: string | undefined) => void;
  onExport?: () => void;
}
