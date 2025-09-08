
// I changed Post id and user_id to string, why ? ids are UUID in db
export interface Post {
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
}
