import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import useCurrentUser from '@/hooks/useCurrentUser';
import React from 'react';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';

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
  return (
    <>
      <Navbar />
      <Billboard />
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
