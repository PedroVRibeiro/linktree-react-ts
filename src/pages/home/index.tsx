import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Social } from "../../components/social";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
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

type SocialLinkProps = {
  facebook: string;
  youtube: string;
  instagram: string;
};

export function Home() {
  const [linksList, setLinksList] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinkProps>();

  useEffect(() => {
    function loadLinks() {
      const linksCollection = collection(db, "links");
      const linksQuery = query(linksCollection, orderBy("createdAt", "asc"));

      getDocs(linksQuery).then((snapshot) => {
        let links = [] as LinkProps[];

        snapshot.forEach((item) => {
          links.push({
            id: item.id,
            ...item.data(),
          } as LinkProps);
        });

        setLinksList(links);
      });
    }

    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const socialLinks = doc(db, "social", "link");
      getDoc(socialLinks).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }

    loadSocialLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        Pedro Ribeiro
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {linksList.map((link) => (
          <section
            key={link.id}
            style={{ backgroundColor: link.background }}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105">
            <a href={link.url} target="_blank">
              <p
                className="text-base md:text-lg"
                style={{ color: link.textColor }}>
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks?.facebook}>
              <FaFacebook size={35} color="#FFF" />
            </Social>

            <Social url={socialLinks?.youtube}>
              <FaYoutube size={35} color="#FFF" />
            </Social>

            <Social url={socialLinks?.instagram}>
              <FaInstagram size={35} color="#FFF" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
