import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { registration } = credentials;
        if (registration === true) {
          (async function POST() {
            const url = "/api/addUser";
            const content = await fetch(url, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            const response = await content.json();
            console.log(response);
          })();
        } else {
          // check to see if the user's email and password is valid
        }
        return { email: credentials.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
