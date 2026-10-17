import React, { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

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
  const [depoimentos, setDepoimentos] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  const pixKey = "amorazulprojetosocial@gmail.com";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  useEffect(() => {
    const queryCampanhas = `*[_type == "campanha"] {
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

    const queryDepoimentos = `*[_type == "depoimento"] {
      _id,
      nome,
      imagem,
      legenda
    }`;

    Promise.all([client.fetch(queryCampanhas), client.fetch(queryDepoimentos)])
      .then(([campanhasData, depoimentosData]) => {
        setCampanhas(campanhasData);
        setDepoimentos(depoimentosData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar dados do Sanity:', err);
        setLoading(false);
      });
  }, []);

  const openLightbox = (imagesList, index) => {
    setGalleryImages(imagesList);
    setCurrentImageIndex(index);
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    if (galleryImages.length > 0) {
      setCurrentImageIndex((prev) => 
        prev < galleryImages.length - 1 ? prev + 1 : prev
      );
    }
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    if (galleryImages.length > 0) {
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentImageIndex !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') setCurrentImageIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex, galleryImages]);

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        {/* Header Responsivo */}
        <header className="bg-white/95 backdrop-blur-md border-b border-sky-200/60 sticky top-0 z-40 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3 font-bold text-lg md:text-xl text-blue-600">
              <img 
                src={logoUrl} 
                alt="Logo Projeto Amor Azul" 
                className="w-10 h-10 rounded-full object-cover shadow-sm border border-sky-200" 
              />
              <div className="flex flex-col">
                <span>Projeto Amor Azul</span>
                <span className="text-xs text-slate-500 font-normal">📍 Moreno - PE</span>
              </div>
            </div>

            {/* Links Desktop */}
            <nav className="hidden lg:flex gap-6 text-sm font-medium text-slate-600 items-center">
              <a href="#missao" className="hover:text-blue-600 transition">Quem Somos</a>
              <a href="#ajudar" className="hover:text-blue-600 transition">Quero ajudar!</a>
              <a href="#campanhas" className="hover:text-blue-600 transition">Nossas campanhas</a>
              <a href="#depoimentos" className="hover:text-blue-600 transition">Depoimentos</a>
              <a 
                href="https://www.instagram.com/projetosocialamorazul?dlrf=b2h6c2M2NjVzNGUz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-1 transition"
              >
                Instagram
              </a>
            </nav>

            <div className="hidden lg:flex">
              <a
                href="#doar"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm text-sm"
              >
                Como doar?
              </a>
            </div>

            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-blue-600 focus:outline-none"
              aria-label="Abrir Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Menu Dropdown Mobile */}
          {menuOpen && (
            <div className="lg:hidden bg-white border-b border-sky-100 px-4 pt-2 pb-4 space-y-3 flex flex-col text-sm">
              <a href="#missao" onClick={() => setMenuOpen(false)} className="text-slate-700 py-1 hover:text-blue-600">Quem Somos</a>
              <a href="#ajudar" onClick={() => setMenuOpen(false)} className="text-slate-700 py-1 hover:text-blue-600">Quero ajudar!</a>
              <a href="#campanhas" onClick={() => setMenuOpen(false)} className="text-slate-700 py-1 hover:text-blue-600">Nossas campanhas</a>
              <a href="#depoimentos" onClick={() => setMenuOpen(false)} className="text-slate-700 py-1 hover:text-blue-600">Depoimentos</a>
              <a 
                href="https://www.instagram.com/projetosocialamorazul?dlrf=b2h6c2M2NjVzNGUz" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="text-pink-600 font-semibold py-1 flex items-center gap-1"
              >
                Nosso Instagram
              </a>
              <a
                href="#doar"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Como doar?
              </a>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-16 md:space-y-20">
          
          {/* Seção Missão */}
          <section id="missao" className="bg-white/90 rounded-2xl p-6 md:p-8 shadow-sm border border-sky-100 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-blue-600 font-bold text-xs md:text-sm uppercase tracking-wider">Nossa Essência</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 mb-4">O que é o projeto?</h2>
              <p className="text-slate-600 text-justify leading-relaxed mb-4 text-sm md:text-base">
                O <strong>Projeto Amor Azul</strong> é uma iniciativa sem fins políticos ou lucrativos. Somos apenas um grupo de amigos unidos pelo desejo de fazer o bem, espalhar amor, levar alegria e esperança a quem mais precisa.
              </p>
              <p className="text-slate-600 text-justify leading-relaxed text-sm md:text-base">
                Sem interesses, sem esperar nada em troca. Apenas corações dispostos a servir, compartilhar e transformar pequenos gestos em grandes demonstrações do amor de Deus. 💙
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 mb-3">Quero ajudar!</h2>
            <p className="text-slate-600 max-w-xl mx-auto mb-8 text-sm md:text-base">
              Existem várias formas de colaborar com o Projeto Amor Azul e espalhar amor por onde passamos.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-sky-100 text-left hover:border-blue-300 transition flex flex-col justify-between">
                <div>
                  <div className="text-3xl mb-3">🤝</div>
                  <h3 className="font-bold text-lg mb-2 text-slate-900">Seja Voluntário</h3>
                  <p className="text-slate-600 text-sm text-justify mb-4">
                    Participe da organização, entrega de doações e eventos presenciais nas comunidades de Moreno e região.
                  </p>
                </div>
                <a
                  href="https://wa.me/5581988888888?text=Ol%C3%A1!%20Gostaria%20de%20me%20tornar%20um%20volunt%C3%A1rio%20do%20Projeto%20Amor%20Azul!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white text-center text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  Falar no WhatsApp
                </a>
              </div>

              <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-sky-100 text-left hover:border-blue-300 transition flex flex-col justify-between">
                <div>
                  <div className="text-3xl mb-3">🎁</div>
                  <h3 className="font-bold text-lg mb-2 text-slate-900">Doação de Itens</h3>
                  <p className="text-slate-600 text-sm text-justify mb-4">
                    Doação de chocolates na Páscoa, Doces no Dia das Crianças e Brinquedos no Natal.
                  </p>
                </div>
                <a
                  href="https://wa.me/5581988888888?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20doa%C3%A7%C3%A3o%20de%20itens%20para%20o%20Projeto%20Amor%20Azul!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white text-center text-xs font-bold px-4 py-2.5 rounded-lg transition"
                >
                  Combinar Doação no WhatsApp
                </a>
              </div>

              <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-sky-100 text-left hover:border-blue-300 transition">
                <div className="text-3xl mb-3">💸</div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">Contribuição Financeira</h3>
                <p className="text-slate-600 text-sm text-justify">
                  Ajude a custear os insumos e a logística das nossas campanhas através de doações via PIX.
                </p>
              </div>
            </div>
          </section>

          {/* Seção Campanhas */}
          <section id="campanhas">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 mb-3">Ações Realizadas</h2>
              <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base">
                Clique em uma campanha para ver as fotos e o histórico das edições anteriores.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12 text-slate-500">Carregando dados...</div>
            ) : campanhas.length === 0 ? (
              <div className="text-center py-12 text-slate-500 bg-white/90 rounded-2xl border border-sky-100">
                Nenhuma campanha cadastrada no momento.
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
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
                      <div className="p-5 md:p-6">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{item.titulo}</h3>
                        <p className="text-slate-600 text-xs md:text-sm text-justify">{item.descricaoBreve}</p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 md:px-6 md:pb-6">
                      <span className="text-blue-600 font-semibold text-xs md:text-sm hover:underline">
                        Ver Ações e Fotos →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SEÇÃO DEPOIMENTOS E ELOGIOS (GALERIA DE PRINTS) */}
          <section id="depoimentos" className="bg-white/90 rounded-2xl p-6 md:p-10 shadow-sm border border-sky-100">
            <div className="text-center mb-8">
              <span className="text-blue-600 font-bold text-xs md:text-sm uppercase tracking-wider">Carinho da Comunidade</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 mb-2">Depoimentos & Elogios</h2>
              <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base">
                Confira algumas das mensagens e carinhos que recebemos de quem acompanha nosso trabalho. Clique para ampliar!
              </p>
            </div>

            {depoimentos.length === 0 ? (
              <div className="text-center py-8 text-slate-500 bg-sky-50/50 rounded-xl border border-sky-100">
                Cadastre as fotos dos depoimentos no Sanity Studio para exibi-las aqui.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {depoimentos.map((dep, idx) => {
                  const imgUrl = urlFor(dep.imagem)?.url();
                  const allDepImages = depoimentos.map(d => urlFor(d.imagem)?.url());
                  return (
                    <div 
                      key={dep._id || idx}
                      onClick={() => openLightbox(allDepImages, idx)}
                      className="bg-sky-50/70 p-3 rounded-xl border border-sky-100 hover:border-blue-300 transition cursor-pointer shadow-sm hover:shadow-md"
                    >
                      {imgUrl && (
                        <img 
                          src={imgUrl} 
                          alt={dep.nome || 'Print Depoimento'} 
                          className="w-full h-48 md:h-60 object-contain rounded-lg bg-white"
                        />
                      )}
                      {dep.nome && (
                        <h4 className="font-bold text-slate-800 text-xs md:text-sm mt-3 text-center truncate">
                          {dep.nome}
                        </h4>
                      )}
                      {dep.legenda && (
                        <p className="text-slate-500 text-xs text-center mt-0.5 truncate">
                          {dep.legenda}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Seção Como Doar */}
          <section id="doar" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-6 md:p-12 text-center shadow-lg max-w-full overflow-hidden">
            <span className="bg-blue-500/50 text-blue-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Faça a diferença</span>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-3 mb-3 md:mb-4">Faça uma Doação via PIX</h2>
            <p className="max-w-xl mx-auto text-blue-100 mb-6 text-xs md:text-sm leading-relaxed">
              Sua contribuição é fundamental para mantermos nossas campanhas de Páscoa, Dia das Crianças e Natal ativas.
            </p>
            <div className="bg-white text-slate-900 inline-flex flex-col sm:flex-row items-center gap-3 px-5 py-4 rounded-xl shadow-md max-w-full">
              <div className="text-center sm:text-left">
                <span className="text-xs text-slate-500 block mb-0.5">Chave PIX (E-mail)</span>
                <span className="font-mono font-bold text-sm md:text-base text-blue-600 break-all select-all">
                  {pixKey}
                </span>
              </div>
              <button
                onClick={handleCopyPix}
                className={`px-4 py-2 rounded-lg font-bold text-xs transition duration-200 flex items-center gap-1.5 shrink-0 ${
                  copiedPix 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                }`}
              >
                {copiedPix ? (
                  <><span>✓</span> Copiado!</>
                ) : (
                  <>Copiar Chave PIX</>
                )}
              </button>
            </div>
          </section>

        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 border-t border-sky-100 mt-16 py-6 text-center text-slate-500 text-xs md:text-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p>© 2026 Projeto Amor Azul — Moreno / PE. Todos os direitos reservados.</p>
          <a 
            href="https://www.instagram.com/projetosocialamorazul?dlrf=b2h6c2M2NjVzNGUz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-600 hover:underline font-semibold"
          >
            Siga-nos no Instagram @projetosocialamorazul
          </a>
        </div>
      </footer>

      {/* Modal Galeria da Campanha */}
      {modalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl relative p-5 md:p-8">
            <button
              onClick={() => setModalData(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 border-b pb-3 border-sky-100 pr-8">
              {modalData.titulo} - Edições Realizadas
            </h2>

            {modalData.edicoes && modalData.edicoes.length > 0 ? (
              <div className="space-y-8">
                {modalData.edicoes.map((edicao, idx) => {
                  const edicaoImages = edicao.galeria ? edicao.galeria.map(f => urlFor(f).url()) : [];
                  return (
                    <div key={idx} className="border-l-4 border-blue-600 pl-4 py-1">
                      <h3 className="font-bold text-lg text-slate-900">Ano {edicao.ano}</h3>
                      {edicao.descricao && (
                        <p className="text-slate-600 text-xs md:text-sm text-justify mt-1 mb-4">{edicao.descricao}</p>
                      )}

                      {edicaoImages.length > 0 && (
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
                            Galeria de Fotos ({edicao.ano}) — Clique para ampliar:
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {edicaoImages.map((imgUrl, fIdx) => (
                              <img
                                key={fIdx}
                                src={imgUrl}
                                alt={`Foto ${modalData.titulo} ${edicao.ano}`}
                                onClick={() => openLightbox(edicaoImages, fIdx)}
                                className="w-full h-24 md:h-28 object-cover rounded-lg border border-slate-200 hover:scale-105 transition-transform cursor-pointer shadow-sm"
                                title="Clique para ver em tela cheia"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-500 text-sm py-4">
                Nenhuma edição cadastrada para esta ação ainda.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Lightbox / Visualizador com Setas de Navegação Sem Loop */}
      {currentImageIndex !== null && galleryImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 md:p-4"
          onClick={() => setCurrentImageIndex(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCurrentImageIndex(null)}
              className="absolute -top-10 right-2 text-white bg-white/20 hover:bg-white/40 rounded-full w-9 h-9 flex items-center justify-center font-bold text-lg transition z-10"
            >
              ✕
            </button>

            {galleryImages.length > 1 && currentImageIndex > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-2 md:left-4 text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center font-bold text-2xl transition z-10"
                title="Foto Anterior"
              >
                ‹
              </button>
            )}

            <img
              src={galleryImages[currentImageIndex]}
              alt="Visualização em Tela Cheia"
              className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-lg shadow-2xl select-none"
            />

            {galleryImages.length > 1 && currentImageIndex < galleryImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-2 md:right-4 text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center font-bold text-2xl transition z-10"
                title="Próxima Foto"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}