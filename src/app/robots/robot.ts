/* Defines the Robot entity */
export interface Robot {
  id: number | null;
  approvalRating: number | null;
  description: string;
  manufact: string;
  imageurl: string;
  mpaa: string;
  price: number | null;
  releaseDate: string;
  starRating: number | null;
  title: string;
  category: string;
  tags?: string[];
}
