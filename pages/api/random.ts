import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { HTTP_METHOD } from 'next/dist/server/web/http';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    return await requestHandler(
      'GET',
      req,
      res,
      async (req, res) => {
        await serverAuth(req);
        const moviesCount = await prismadb.movie.count();
        const randomIndex = Math.floor(
          Math.random() * moviesCount
        );

        const randomMovies = await prismadb.movie.findMany({
          take: 1,
          skip: randomIndex,
        });

        return res.status(200).json(randomMovies[0]);
      }
    );
    // if (req.method !== 'GET') {
    //   return res.status(405).end();
    // }
    //
    // await serverAuth(req);
    //
    // const moviesCount = await prismadb.movie.count();
    // const randomIndex = Math.floor(
    //   Math.random() * moviesCount
    // );
    //
    // const randomMovies = await prismadb.movie.findMany({
    //   take: 1,
    //   skip: randomIndex,
    // });
    //
    // return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
export const requestHandler = async (
  requestType: HTTP_METHOD ,
  req: NextApiRequest,
  res: NextApiResponse,
  handler: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => void
) => {
  if (req.method !== requestType) {
    return res.status(405).end();
  }
  return handler(req, res);
};
