
export type Page =
  | 'Boshlangich'
  | 'Ilmiy faoliyat'
  | 'Uquv-uslubiy faoliyat'
  | 'Manaviy-marifiy faoliyat'
  | 'Tashkiliy va boshqaruv faoliyati';

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  sources?: GroundingSource[];
}

export interface GroundingSource {
    uri: string;
    title: string;
}
