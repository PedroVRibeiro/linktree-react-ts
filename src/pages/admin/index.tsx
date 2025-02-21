import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { FiTrash } from "react-icons/fi";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

type LinkProps = {
  id: string;
  name: string;
  url: string;
  background: string;
  textColor: string;
};

export function Admin() {
  const [linkNameInput, setLinkNameInput] = useState("");
  const [linkURLInput, setLinkURLInput] = useState("");
  const [linkTextColorInput, setLinkTextColorInput] = useState("#121212");
  const [linkBackgroundColorInput, setLinkBackgroundColorInput] =
    useState("#f1f1f1");
  const [linksList, setLinksList] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksCollection = collection(db, "links");
    const linksQuery = query(linksCollection, orderBy("createdAt", "asc"));

    const unlisten = onSnapshot(linksQuery, (snapshot) => {
      let links = [] as LinkProps[];

      snapshot.forEach((item) => {
        links.push({
          id: item.id,
          ...item.data(),
        } as LinkProps);
      });

      setLinksList(links);
    });

    return () => {
      unlisten();
    };
  }, []);

  function handleRegisterLink(e: FormEvent) {
    e.preventDefault();

    if (linkNameInput === "" || linkURLInput === "") {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    addDoc(collection(db, "links"), {
      name: linkNameInput,
      url: linkURLInput,
      background: linkBackgroundColorInput,
      textColor: linkTextColorInput,
      createdAt: new Date(),
    })
      .then(() => {
        setLinkNameInput("");
        setLinkURLInput("");
        console.log("Cadastro realizado com sucesso!");
      })
      .catch((error) => {
        console.log("Não foi possível cadastrar o link: " + error);
      });
  }

  async function handleDeleteLink(id: string) {
    const link = doc(db, "links", id);
    await deleteDoc(link);
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <label className="text-white font-medium mt-2 mb-2">
        Cadastrar um Link:
      </label>
      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegisterLink}>
        <label className="text-white font-medium mt-2 mb-2">Nome</label>
        <input
          className="bg-white rounded-md"
          placeholder=" Digite o nome do link..."
          value={linkNameInput}
          onChange={(e) => setLinkNameInput(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">URL</label>
        <input
          className="bg-white rounded-md"
          type="url"
          placeholder=" Digite a URL do link..."
          value={linkURLInput}
          onChange={(e) => setLinkURLInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Cor do texto
            </label>
            <input
              type="color"
              value={linkTextColorInput}
              onChange={(e) => setLinkTextColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Cor do fundo
            </label>
            <input
              type="color"
              value={linkBackgroundColorInput}
              onChange={(e) => setLinkBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {linkNameInput !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">
              Preview do link:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: linkBackgroundColorInput,
              }}>
              <p className="font-medium" style={{ color: linkTextColorInput }}>
                {linkNameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="mb-7 bg-blue-600 rounded-md text-white font-medium gap-4 flex justify-center">
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

      {linksList.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{
            backgroundColor: link.background,
            color: link.textColor,
          }}>
          <p>{link.name}</p>
          <div>
            <button
              onClick={() => handleDeleteLink(link.id)}
              className="border border-dashed p-1 rounded bg-neutral-900">
              <FiTrash size={18} color="#FFF" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
