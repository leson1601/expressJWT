
interface IUser {
  username: String;
  _id: String;
  roles: Array<Role>;
  password: String;
  refreshToken?: String;
}
interface IEmployee {
  firstname: String;
  lastname: String;
  
}

enum Role {
  ADMIN = 1987,
  USER = 2001,
  Editor = 2222,
}

interface IToken {
  userInfo: {
    user: string,
    roles: Array<Role>;
  };
}

export {
  IUser,
  IToken,
  IEmployee
};