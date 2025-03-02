export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Profile {
  username: string;
  description: string;
  profilePicture: string;
}

export interface Course {
  _id: string;
  name: string;
  qualification: string;
  examBoard: string;
}

export interface Question {
  _id: string;
  question: string;
  markScheme: string;
  title: string;
  description: string;
  course: string;
  totalMarks: number;
  author: string;
  favorited: boolean;
}

export interface UserComment {
  _id: string;
  user: {
    _id: string;
    username: string;
    profilePicture: string;
  };
  comment: string;
}

export interface Achievement {
  achievement: {
    name: string;
    description: string;
  };
  createdAt: Date;
}
