import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { signIn, signOut, getSession } from 'next-auth/react';
import Image from 'next/image';

interface HomeProps {
  data: string;
}

type Data = {
  expires: string,
  id: string
  user: {
    name: string,
    email: string,
    image: string
  },
}

export const getServerSideProps: GetServerSideProps = async ({req}: GetServerSidePropsContext) =>{
  const session = await getSession({ req });

  const data = JSON.stringify(session);

  return {
    props: {data}
  };
};

export default function Home({data}: HomeProps) {
  const session: Data = JSON.parse(data);
  console.log(session);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1>DevStream</h1>
      {session && <Image src={session.user.image} alt={session.user.name} height={100} width={100}/>}
      <div className='flex gap-4'>
        <button onClick={() => signIn('linkedin')}>Entrar com Linkedin</button>
        <button onClick={() => signIn('google')}>Entrar com Google</button>
        <button onClick={() => signIn('github')}>Entrar com Github</button>
        <button onClick={() => signOut()}>Sair</button>
      </div>
    </div>
  );
}
