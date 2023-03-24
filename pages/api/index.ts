import { NextApiRequest, NextApiResponse } from 'next';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);
  res
}
