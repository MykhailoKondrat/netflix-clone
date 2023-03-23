import { getSession, signOut } from 'next-auth/react';
import { NextPageContext } from 'next';
import useCurrentUser from '@/hooks/useCurrentUser';
import React from 'react';
import Navbar from '@/components/Navbar';
import useBillboard from '@/hooks/useBillboard';

export async function getServerSideProps(
  context: NextPageContext
) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default function Home() {
  const { data: user } = useCurrentUser();

  const { data } = useBillboard();
  console.log(data);
  return (
    <>

      <Navbar />
      {/*<p className="text-white">*/}
      {/*  Logged in as {user?.email}*/}
      {/*</p>*/}
      {/*<button*/}
      {/*  className="h-10 w-full bg-white"*/}
      {/*  onClick={() => {*/}
      {/*    signOut();*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Sign out*/}
      {/*</button>*/}
    </>
  );
}
