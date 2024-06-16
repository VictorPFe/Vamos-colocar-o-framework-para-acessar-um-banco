import Livro from "../modelo/Livro";

const baseURL = "http://localhost:3030/livros";

interface LivroMongo {
    codigo: string;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string;
}

class ControleLivro {
    async obterLivros(): Promise<Livro[]> {
        try {
            const response = await fetch(baseURL, { method: 'GET' });
            const data = await response.json();
            return data.map((livro: LivroMongo) => new Livro(livro.codigo, livro.codEditora, livro.titulo, livro.resumo, livro.autores));
        } catch (error) {
            console.error('Erro ao obter livros:', error);
            return [];
        }
    }

    async incluir(livro: Livro): Promise<boolean> {
        try {
            const livroMongo: LivroMongo = {
                codigo: livro.codigo,
                codEditora: livro.codEditora,
                titulo: livro.titulo,
                resumo: livro.resumo,
                autores: livro.autores,
            };

            const response = await fetch(baseURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(livroMongo),
            });

            const data = await response.json();
            return data.ok;
        } catch (error) {
            console.error('Erro ao incluir livro:', error);
            return false;
        }
    }

    async excluir(codigo: string): Promise<boolean> {
        try {
            const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
            const data = await response.json();
            return data.ok;
        } catch (error) {
            console.error('Erro ao excluir livro:', error);
            return false;
        }
    }
}

export default ControleLivro;