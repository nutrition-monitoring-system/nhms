import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      secret: process.env.JWT_SECRET,
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const userRegistration = credentials.registration === "true";
        if (userRegistration) {
          const { email, password, surname } = credentials;
          const url = "http://localhost:3000/api/addUser";
          const content = await fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          });
          const response = await content.json();
          if (response.status === 200) {
            return {
              id: response.id,
              email: email,
              surname: surname,
            };
          }
        } else {
          const { email, password } = credentials;
          const url = "http://localhost:3000/api/getUser";
          const content = await fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          const response = await content.json();
          if (response.status === 200) {
            return {
              id: response.id,
              email: response.email,
              surname: response.surname,
            };
          }
        }
        return { email: credentials.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
