interface User {
  id: string;
  username: string;
  email: string;
}

interface Course {
  _id: string;
  name: string;
  qualification: string;
  examBoard: string;
}

interface Question {
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

interface UserComment {
  username: string;
  profilePicture: string;
  comment: string;
}

interface Achievement {
  achievement: {
    name: string;
    description: string;
  };
  createdAt: Date;
}

export { User, Course, Question, Achievement, UserComment };
