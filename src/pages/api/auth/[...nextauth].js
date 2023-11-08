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
        const userRegistration = credentials.registration == true;
        console.log(req.body);
        if (userRegistration) {
          const url = "http://localhost:3000/api/addUSer";
          const content = await fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          });
          const response = await content.json();
          console.log(response);
        } else {
          // check to see if the user's email and password is valid
        }
        return { email: credentials.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
