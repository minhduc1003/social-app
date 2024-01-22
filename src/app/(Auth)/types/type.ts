export type user = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  bio: string;
  phone: string;
  permission: string;
  profilePicture: string;
  friend: friends[] | [];
  notification: notification[] | [];
  gender: string;
  dayOfBirth: string;
};
export type notification = {
  name: string;
  des: string;
  image: string;
  userId: string;
  createdAt: Date
}
type friends = {
  image: string;
  name: string;
  userId: string;
  status: "Pending" | "Accepted"
}