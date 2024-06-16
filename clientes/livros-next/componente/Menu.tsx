import Link from 'next/link';

export const Menu: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link href="/" legacyBehavior>
          <a className="navbar-brand">Catalogo de Livro</a>
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href="/LivroLista" legacyBehavior>
                <a className="nav-link">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/LivroDados" legacyBehavior>
                <a className="nav-link">Catalogo</a>
              </Link>
            </li>
          </ul>
        </div>
    </nav>
  );
};
