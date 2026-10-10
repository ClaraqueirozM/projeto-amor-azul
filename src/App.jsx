import React, { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Logótipo oficial em formato digital direto (funciona a 100% sem ficheiros externos)
const logoUrl = "data:image/svg+xml;utf8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
    <circle cx="250" cy="250" r="250" fill="#0d7a73"/>
    <text x="250" y="160" font-family="Georgia, serif" font-size="22" fill="#ffffff" letter-spacing="6" text-anchor="middle" font-weight="bold">PROJETO SOCIAL</text>
    <text x="250" y="275" font-family="Georgia, serif" font-size="130" fill="#ffffff" font-style="italic" text-anchor="middle">Amor</text>
    <text x="260" y="375" font-family="Brush Script MT, cursive" font-size="115" fill="#ffffff" text-anchor="middle">azul</text>
  </svg>
`);

const client = createClient({
  projectId: 'is6vyrha',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return source ? builder.image(source) : null;
}

export default function App() {
  const [campanhas, setCampanhas] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "campanha"] {
      _id,
      titulo,
      descricaoBreve,
      imagemCapa,
      edicoes[] {
        ano,
        descricao,
        galeria[]
      }
    }`;

    client
      .fetch(query)
      .then((data) => {
        setCampanhas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar campanhas:', err);
        setLoading(false);
      });
  }, []);

  return (
    // Fundo Azul Bebé suave em todo o site
    <div className="min-h-screen bg-sky-50 text-slate-800 font-sans">
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-sky-200/60 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 font-bold text-xl text-blue-600">
            <img 
              src={logoUrl} 
              alt="Logo Projeto Amor Azul" 
              className="w-10 h-10 rounded-full object-cover shadow-sm border border-sky-200" 
            />
            <span>Projeto Amor Azul</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#missao" className="hover:text-blue-600 transition">Qual nossa missão e quem somos?</a>
            <a href="#ajudar" className="hover:text-blue-600 transition">Quero ajudar!</a>
            <a href="#campanhas" className="hover:text-blue-600 transition">Nossas campanhas</a>
          </nav>
          <a
            href="#doar"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            Como doar?
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-20">
        
        {/* Seção Missão */}
        <section id="missao" className="bg-white/90 rounded-2xl p-8 shadow-sm border border-sky-100 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Nossa Essência</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1 mb-4">Qual nossa missão e quem somos?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              O <strong>Projeto Amor Azul</strong> é uma iniciativa dedicada a levar alegria, esperança e apoio a comunidades carentes através de ações solidárias contínuas ao longo do ano.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Nossa missão é transformar vidas e criar sorrisos por meio da união de voluntários e doadores comprometidos com o bem-estar social e o amor ao próximo.
            </p>
          </div>
          <div className="bg-sky-100/70 rounded-xl p-6 border border-sky-200/80 flex flex-col justify-center items-center text-center">
            <img 
              src={logoUrl} 
              alt="Logo Redonda" 
              className="w-20 h-20 rounded-full object-cover shadow-md mb-3 border-2 border-white" 
            />
            <h3 className="font-bold text-xl text-blue-900 mb-2">Junte-se a esta causa</h3>
            <p className="text-blue-800 text-sm">Cada gesto de carinho faz toda a diferença na vida de centenas de crianças e famílias.</p>
          </div>
        </section>

        {/* Seção Como Ajudar */}
        <section id="ajudar" className="text-center">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Faça Parte</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1 mb-3">Quero ajudar!</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-10">
            Existem várias formas de colaborar com o Projeto Amor Azul e espalhar amor por onde passamos.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-sky-100 text-left hover:border-blue-300 transition">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Seja Voluntário</h3>
              <p className="text-slate-600 text-sm">Participe da organização, entrega de doações e eventos presenciais nas comunidades.</p>
            </div>
            <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-sky-100 text-left hover:border-blue-300 transition">
              <div className="text-3xl mb-3">🎁</div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Doação de Itens</h3>
              <p className="text-slate-600 text-sm">Doação de chocolates na Páscoa, brinquedos no Dia das Crianças e cestas no Natal.</p>
            </div>
            <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-sky-100 text-left hover:border-blue-300 transition">
              <div className="text-3xl mb-3">💸</div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Contribuição Financeira</h3>
              <p className="text-slate-600 text-sm">Ajude a custear os insumos e logística das nossas campanhas através de PIX.</p>
            </div>
          </div>
        </section>

        {/* Seção Campanhas / Ações Realizadas */}
        <section id="campanhas">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Histórico</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1 mb-3">Ações Realizadas</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Clique em uma campanha para ver as fotos e o histórico das edições anteriores.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-500">Carregando campanhas...</div>
          ) : campanhas.length === 0 ? (
            <div className="text-center py-12 text-slate-500 bg-white/90 rounded-2xl border border-sky-100">
              Nenhuma campanha cadastrada no momento. Acesse o Sanity Studio para adicionar.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {campanhas.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setModalData(item)}
                  className="bg-white/90 rounded-2xl shadow-sm border border-sky-100 overflow-hidden hover:shadow-md hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {item.imagemCapa ? (
                      <img
                        src={urlFor(item.imagemCapa).url()}
                        alt={item.titulo}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-sky-100/50 flex items-center justify-center text-slate-400">
                        Sem foto de capa
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.titulo}</h3>
                      <p className="text-slate-600 text-sm">{item.descricaoBreve}</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <span className="text-blue-600 font-semibold text-sm hover:underline">
                      Ver Ações e Fotos →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Seção Como Doar */}
        <section id="doar" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 md:p-12 text-center shadow-lg">
          <span className="bg-blue-500/50 text-blue-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Faça a diferença</span>
          <h2 className="text-3xl font-extrabold mt-3 mb-4">Faça uma Doação via PIX</h2>
          <p className="max-w-xl mx-auto text-blue-100 mb-6 text-sm">
            Sua contribuição é fundamental para mantermos nossas campanhas de Páscoa, Dia das Crianças e Natal ativas.
          </p>
          <div className="bg-white text-slate-900 inline-block px-6 py-4 rounded-xl shadow-md">
            <span className="text-xs text-slate-500 block mb-1">Chave PIX (E-mail)</span>
            <span className="font-mono font-bold text-lg text-blue-600">amorazulprojetosocial@gmail.com</span>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white/80 border-t border-sky-100 mt-20 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 Projeto Amor Azul. Todos os direitos reservados.</p>
      </footer>

      {/* Modal de Histórico e Galeria da Campanha */}
      {modalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl relative p-6 md:p-8">
            <button
              onClick={() => setModalData(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-3 border-sky-100">
              {modalData.titulo} - Edições Realizadas
            </h2>

            {modalData.edicoes && modalData.edicoes.length > 0 ? (
              <div className="space-y-8">
                {modalData.edicoes.map((edicao, idx) => (
                  <div key={idx} className="border-l-4 border-blue-600 pl-4 py-1">
                    <h3 className="font-bold text-lg text-slate-900">Ano {edicao.ano}</h3>
                    {edicao.descricao && (
                      <p className="text-slate-600 text-sm mt-1 mb-4">{edicao.descricao}</p>
                    )}

                    {edicao.galeria && edicao.galeria.length > 0 && (
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
                          Galeria de Fotos ({edicao.ano}) — Clique para ampliar:
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {edicao.galeria.map((foto, fIdx) => (
                            <img
                              key={fIdx}
                              src={urlFor(foto).url()}
                              alt={`Foto ${modalData.titulo} ${edicao.ano}`}
                              onClick={() => setSelectedImage(urlFor(foto).url())}
                              className="w-full h-28 object-cover rounded-lg border border-slate-200 hover:scale-105 transition-transform cursor-pointer shadow-sm"
                              title="Clique para ver em tela cheia"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm py-4">
                Nenhuma edição cadastrada para esta ação ainda.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Lightbox / Visualizador em Tela Cheia */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl transition"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Visualização em Tela Cheia"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}