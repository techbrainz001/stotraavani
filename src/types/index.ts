export interface CategoryItem {
  id: string;
  nameEn: string;
  nameTe: string;
}

export interface GodCard {
  id: string;
  nameEn: string;
  nameTe: string;
  icon: string;
  categories?: CategoryItem[];
}

export type Category = 'Pujas' | 'Stotras' | 'Ashtottaram' | 'Sahasranamam' | 'Vratas';

export interface Bookmark {
  godId: string;
  category: string;
  stotraId: string;
  titleEn: string;
  titleTe: string;
}

export interface UserSettings {
  darkMode: boolean;
  fontSize: number;
  language: Language;
}

export type Language = 'te' | 'en' | 'hi' | 'ta';

export interface StotraContent {
  id: string;
  title: Record<Language, string>;
  verses: Record<Language, string[]>;
  mangalam?: Record<Language, string>;
}

export interface StotraRegistryItem {
  id: string;
  godId: string;
  category: string;
  titleEn: string;
  titleTe: string;
}

export interface HistoryItem {
  godId: string;
  category: string;
  stotraId: string;
  titleEn: string;
  titleTe: string;
  timestamp: number;
}
