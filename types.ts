export interface GroundingSource {
  uri: string;
  title: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  sources?: GroundingSource[];
}
