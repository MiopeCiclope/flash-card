export interface Card {
  id: string;
  name: string;
  front: {
    word: string;
  };
  back: {
    translation: string;
    sound: string;
    detail: string;
  }
}
