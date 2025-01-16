export interface Card {
  front: {
    word: string;
  };
  back: {
    translation: string;
    sound: string;
    detail: string;
  }
}
