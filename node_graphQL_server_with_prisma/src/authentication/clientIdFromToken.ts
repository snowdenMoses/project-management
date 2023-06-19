import JWT from "jsonwebtoken"

const clientIdFromToken = (token: string) => {
   try {
      return JWT.verify(token, "secret") as {
         userId: string
      }
   }
   catch (err) {
   }

}
export default clientIdFromToken