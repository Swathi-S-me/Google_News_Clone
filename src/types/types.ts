export interface NewsItem {
  urlToImage?: string;
  source?: { name?: string };
  title?: string;
  url?: string;
}

export interface NewsProps {
  news: NewsItem[] | undefined;
  search?: string;
  category?: string;
  loading?: boolean;
}
export type profileProp = {
  
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

export type menuProp = {
   menu: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
};

export interface LanguageOption {
  code: string;
  name: string;
}

export interface langProps {
  isOpen: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (lang: string) => void;
}

export interface changelangProps {
  selectedLang: string;
  onLangChange: (lang: string) => void;
}
export interface NavbarProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedLang: string;
  onLangChange: (lang: string) => void;
}
export interface WeatherInfo {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    main: string;
    icon: string;
  }[];
}
