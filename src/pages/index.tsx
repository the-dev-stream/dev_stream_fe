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
  const normalizedData: Data = JSON.parse(data);
  console.log(normalizedData);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1>DevStream</h1>
      {normalizedData && <Image src={normalizedData.user.image} alt={normalizedData.user.name} height={100} width={100}/>}
      <div className='flex gap-4'>
        <button onClick={() => signIn('linkedin')}>Entrar</button>
        <button onClick={() => signOut()}>Sair</button>
      </div>
    </div>
  );
}
