import { cities } from "../data/cities.js";

export async function getStaticPaths() {
  const paths = cities.map((item) => ({
    params: {
      id: `${strToURL(
        item.nome
      )}-${item.microrregiao.mesorregiao.UF.sigla.toLowerCase()}`,
    },
  }));

  return { paths, fallback: false };
}

export async function generateStaticParams() {
  return cities.map((item) => ({
    id: `${strToURL(
      item.nome
    )}-${item.microrregiao.mesorregiao.UF.sigla.toLowerCase()}`, // Certifique-se de que a chave corresponde ao nome do parâmetro dinâmico
  }));
}

const strToURL = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[áàãâä]/g, "a")
    .replace(/[éèẽêë]/g, "e")
    .replace(/[íìĩîï]/g, "i")
    .replace(/[óòõôö]/g, "o")
    .replace(/[úùũûü]/g, "u")
    .replace(/ç/g, "c")
    .replace(/(\ |_)+/, " ")
    .replace(/(^-+|-+$)/, "")
    .replace(/[^a-z0-9]+/g, "-");
};

export default function ItemPage({ params }) {
  const item = cities.find((item) => {
    return (
      `${strToURL(
        item.nome
      )}-${item.microrregiao.mesorregiao.UF.sigla.toLowerCase()}` === params.id
    );
  });

  if (!item) {
    return <div>Item não encontrado</div>;
  }

  return (
    <div className="h-[50vh] w-[100vw] my-auto">
      <div className="flex justify-center content-center">
        <h1 className="my-40 text-4xl font-semibold">Seja bem vindo à {item.nome}</h1>
      </div>
    </div>
  );
}
