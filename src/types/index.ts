export interface IUser {
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: string;
  phoneNumber?: string;
  team?: string;
}

export interface ITodoItem {
  id?: string;
  content?: string;
  authorId?: string;
  completed?: boolean;
}
