export interface Card {
  id: string;
  front: {
    word: string;
  };
  back: {
    translation: string;
    sound: string;
    detail: string;
  }
}
