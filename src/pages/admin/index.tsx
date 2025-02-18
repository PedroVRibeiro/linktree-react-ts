import { useState } from "react";
import { Header } from "../../components/Header";

export function Admin() {
  const [linkNameInput, setLinkNameInput] = useState("");
  const [linkURLInput, setLinkURLInput] = useState("");
  const [linkTextColorInput, setLinkTextColorInput] = useState("#121212");
  const [linkBackgroundColorInput, setLinkBackgroundColorInput] =
    useState("#f1f1f1");

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <label className="text-white font-medium mt-2 mb-2">
        Cadastrar um Link:
      </label>
      <form className="flex flex-col mt-8 mb-3 w-full max-w-xl">
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
            <p style={{ color: linkTextColorInput }}>Canal do Youtube</p>
          </article>
        </div>
      </form>
    </div>
  );
}
