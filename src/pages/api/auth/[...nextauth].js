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
        const domainName =
          process.env.DEPLOYMENT == "true"
            ? process.env.DEPLOY_URL
            : "http://localhost:3000";
        if (userRegistration) {
          const { email, surname } = credentials;
          const url = domainName + "/api/addUser";
          const content = await fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          });
          const response = await content.json();
          if (response.ok === "true") {
            return {
              id: response.id,
              email: email,
              surname: surname,
            };
          }
        } else {
          const { email, password } = credentials;
          const url = domainName + "/api/getUser";
          const content = await fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          const response = await content.json();
          if (response.error) {
            return null || undefined || false;
          }
          if (response.ok === "true") {
            // checking if the response is valid
            return {
              id: response.id,
              email: response.email,
              surname: response.surname,
              gender: response.gender,
            };
          }
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
