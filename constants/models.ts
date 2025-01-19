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

export { User, Course }