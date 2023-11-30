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
        // check if a user is trying to create a new account or register
        const userRegistration = credentials.registration === "true";
        // get the right API url based of if the user is logged in or not
        const domainName =
          process.env.DEPLOYMENT == "true"
            ? process.env.DEPLOY_URL
            : "http://localhost:3000";

        if (userRegistration) {
          const { email, surname } = credentials;
          const url = domainName + "/api/addUser";
          // post data to backend if user is trying to sign up for the first time
          // /api/addUser will take care of the rest
          const content = await fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          });
          const response = await content.json();
          // if the response is valid then login user
          if (response.ok === "true") {
            return {
              id: response.id,
              email: email,
              surname: surname,
            };
          }
        } else {
          // if user is trying to login and not register
          const { email, password } = credentials;
          const url = domainName + "/api/getUser";
          // Make a post request to the back backend with data from front end
          // /api/getUser will take care of the rest
          const content = await fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          const response = await content.json();
          // if response contains an error then redirect user
          // returning a falsy value means authorize == false
          if (response.error) {
            return null || undefined || false;
          }
          // checking if the response is valid then returning user data to frontend
          if (response.ok === "true") {
            return {
              id: response.id,
              email: response.email,
              surname: response.surname,
              gender: response.gender,
            };
          }
        }
        // finally return null if unable to login or signup
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
