export type NewsItem = {
  urlToImage?: string;
  source?: { name?: string };
  title?: string;
  url?: string;
  
};

export type NewsProps = {
  news: NewsItem[] | undefined;
  search?: string;
   category?: string;
   loading?:boolean
};
export type profileProp = {
  setProfile: any;
};
export type menuProp ={
  setMenu:any
}

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
export type NavbarProps  = {
   setSearch: (value: string) => void;
  selectedLang: string;
  onLangChange: (lang: string) => void;
};