import Head from 'next/head';
import { Menu } from '../../componente/Menu';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Catalogos de Livros</title>
      </Head>
      <Menu />
      <main className="mt-5">
        <h1 className="text-center">Página Inicial</h1>
      </main>
    </div>
  );
};

export default Home;
