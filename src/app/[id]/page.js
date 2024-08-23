import { cities } from '../data/cities.js';

export async function getStaticPaths() {
  const paths = cities.map((item) => ({
    params: { id: `${strToURL(item.nome)}` },
  }));

  return { paths, fallback: false };
}

export async function generateStaticParams() {
  return cities.map((item) => ({
    id: `${strToURL(item.nome)}`, // Certifique-se de que a chave corresponde ao nome do parâmetro dinâmico
  }));
}

function strToURL(str) {
  return str.toLowerCase().trim()
  .replace(/[áàãâä]/g, "a")
  .replace(/[éèẽêë]/g, "e")
  .replace(/[íìĩîï]/g, "i")
  .replace(/[óòõôö]/g, "o")
  .replace(/[úùũûü]/g, "u")
  .replace(/ç/g, "c")
  .replace(/(\ |_)+/, " ")
  .replace(/(^-+|-+$)/, "")
  .replace(/[^a-z0-9]+/g,'-');
  }

export default function ItemPage({ params }) {

  const item = cities.find((item) => {
    return strToURL(item.nome) === params.id
  });

  if (!item) {
    return <div>Item não encontrado</div>;
  }

  return (
    <div>
      <h1>{item.nome}</h1>
    </div>
  );
}
