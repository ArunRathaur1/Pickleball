export interface Athlete {
  _id: string;
  name: string;
  age: number;
  gender: string;
  country: string;
  height: number;
  points: number;
  DUPRID: string;
  sponsors: { name: string; imageUrl: string }[];
  instagramPage?: string;
  titlesWon: { title: string; year: number }[];
  relatedContent: { imageUrl: string; title: string; youtubeLink: string }[];
  imageUrl: string;
  createdAt: string;
}
