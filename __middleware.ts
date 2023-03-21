import { NextApiRequest } from 'next';
// export default function middleware(req:NextApiRequest){
//   console.log('>>>>>>>>>>TEST');
// }
import { withAuth } from "next-auth/middleware"
import { NextRequestWithAuth } from 'next-auth/next/middleware';
//TODO : figure out how to configure middleware for authorization
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req:NextRequestWithAuth) {
    console.log(req.nextauth.token)
    console.log(req.nextauth);
  },
  {
    callbacks: {
      authorized: (...auth) => {
        console.log('>>>>AUTH',auth);
        return true
      },
    },
  }
)

export const config = {
  matcher: [ '/' ],
}
