import React, { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// IMPORTAÇÃO DA LOGO DENTRO DA PASTA SRC
import logoUrl from './logo.png';

// Importação de fontes
const fontStyles = document.createElement('link');
fontStyles.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Playfair+Display:ital,wght@0,600;0,800;1,600&display=swap';
fontStyles.rel = 'stylesheet';
document.head.appendChild(fontStyles);

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
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans flex flex-col justify-between selection:bg-[#0c7a85] selection:text-white">
      <div>
        {/* Header Responsivo */}
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3 font-bold text-lg md:text-xl text-[#0c7a85]">
              <img 
                src={logoUrl} 
                alt="Logo Projeto Amor Azul" 
                className="w-10 h-10 rounded-xl object-cover shadow-sm border border-sky-200" 
              />
              <div className="flex flex-col">
                <span className="tracking-tight leading-tight font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Projeto Amor Azul
                </span>
                <span className="text-[11px] text-slate-500 font-normal font-sans">📍 Moreno - PE</span>
              </div>
            </div>

            {/* Links Desktop */}
            <nav className="hidden lg:flex gap-6 text-sm font-medium text-slate-600 items-center">
              <a href="#missao" className="hover:text-[#0c7a85] transition">Quem Somos</a>
              <a href="#ajudar" className="hover:text-[#0c7a85] transition">Quero ajudar</a>
              <a href="#campanhas" className="hover:text-[#0c7a85] transition">Nossas Ações</a>
              <a href="#depoimentos" className="hover:text-[#0c7a85] transition">Depoimentos</a>
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
                className="bg-[#0c7a85] hover:bg-[#095f68] text-white px-5 py-2 rounded-xl font-semibold transition shadow-md hover:shadow-lg text-sm"
              >
                Como doar?
              </a>
            </div>

            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-[#0c7a85] focus:outline-none"
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

          {/* Menu Mobile */}
          {menuOpen && (
            <div className="lg:hidden bg-white border-b border-sky-100 px-4 pt-2 pb-4 space-y-3 flex flex-col text-sm">
              <a href="#missao" onClick={() => setMenuOpen(false)} className="text-slate-700 py-1 hover:text-[#0c7a85]">Quem Somos</a>
              <a href="#ajudar" onClick={() => setMenuOpen(false)} className="text-slate-700 py-1 hover:text-[#0c7a85]">Quero ajudar!</a>
              <a href="#campanhas" onClick={() => setMenuOpen(false)} className="text-slate-700 py-1 hover:text-[#0c7a85]">Nossas campanhas</a>
              <a href="#depoimentos" onClick={() => setMenuOpen(false)} className="text-slate-700 py-1 hover:text-[#0c7a85]">Depoimentos</a>
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
                className="bg-[#0c7a85] text-white text-center py-2.5 rounded-xl font-semibold transition"
              >
                Como doar?
              </a>
            </div>
          )}
        </header>

        {/* Hero Banner */}
        <div className="bg-gradient-to-b from-[#0c7a85] via-[#0a6d77] to-[#085a62] text-white py-12 md:py-20 px-4 text-center shadow-inner relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <span className="bg-white/15 text-sky-100 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md border border-white/20">
              Sem fins lucrativos • Sem fins políticos
            </span>
            <h1 
              className="text-2xl sm:text-3xl md:text-5xl font-normal tracking-tight text-white mt-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Espalhando <span className="italic font-semibold text-sky-200">solidariedade</span>, <span className="font-serif">amor</span> e <span style={{ fontFamily: "'Dancing Script', cursive" }} className="text-2xl sm:text-3xl md:text-5xl text-sky-300">sorrisos 💙</span>
            </h1>
            <p className="text-sky-100/90 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed text-justify font-light">
              Transformando a vida de centenas de crianças e famílias em Moreno - PE através da união de amigos e voluntários.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-3">
              <a
                href="#ajudar"
                className="bg-white text-[#0c7a85] font-bold px-5 py-2.5 md:px-6 md:py-3 rounded-xl hover:bg-sky-50 transition shadow-lg hover:scale-105 text-xs md:text-sm"
              >
                Quero Participar
              </a>
              <a
                href="#doar"
                className="bg-sky-950/40 hover:bg-sky-950/60 text-white border border-white/30 font-bold px-5 py-2.5 md:px-6 md:py-3 rounded-xl transition text-xs md:text-sm"
              >
                Fazer uma Doação
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8 md:py-16 space-y-12 md:space-y-24">
          
          {/* BLOCO 1: QUEM SOMOS */}
          <section id="missao" className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-12 shadow-sm border border-slate-200/80">
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-[2px] bg-[#0c7a85]"></span>
                  <span className="text-[#0c7a85] font-bold text-xs uppercase tracking-widest">Nosso propósito</span>
                </div>
                <h2 
                  className="text-xl md:text-4xl font-normal text-slate-900 mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  O que é o <span className="italic text-[#0c7a85]">projeto?</span>
                </h2>
                <p className="text-slate-600 text-justify leading-relaxed mb-3 text-xs md:text-base">
                  O <strong>Projeto Amor Azul</strong> é uma iniciativa transparente e dedicada à comunidade. Somos um grupo de amigos unidos pelo desejo sincero de fazer o bem, levar alegria e renovar a esperança de quem mais precisa.
                </p>
                <p className="text-slate-600 text-justify leading-relaxed text-xs md:text-base">
                  Sem interesses individuais ou políticos. Apenas corações dispostos a servir, compartilhar e transformar pequenos gestos em grandes demonstrações do amor de Deus. 💙
                </p>
              </div>
              <div className="bg-[#f0f7f8] rounded-xl md:rounded-2xl p-5 md:p-8 border border-[#0c7a85]/20 flex flex-col justify-center items-center text-center shadow-inner">
                <img 
                  src={logoUrl} 
                  alt="Logo Projeto Amor Azul" 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shadow-md mb-3 border-2 border-white" 
                />
                <h3 
                  className="font-semibold text-lg md:text-2xl text-[#0c7a85] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Junte-se a esta causa
                </h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed text-justify">
                  Cada doação e cada hora de trabalho voluntário fazem toda a diferença para o futuro de Moreno.
                </p>
              </div>
            </div>
          </section>

          {/* DIVISOR */}
          <div className="flex items-center justify-center gap-4 opacity-40 py-1">
            <span className="w-16 h-[1px] bg-[#0c7a85]"></span>
            <span className="text-[#0c7a85] text-lg">💙</span>
            <span className="w-16 h-[1px] bg-[#0c7a85]"></span>
          </div>

          {/* BLOCO 2: COMO AJUDAR */}
          <section id="ajudar" className="bg-[#f2f8f9] rounded-2xl md:rounded-3xl p-5 md:p-12 border border-[#0c7a85]/15 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-6 md:mb-12">
              <span className="text-[#0c7a85] font-bold text-xs uppercase tracking-widest">Faça a diferença</span>
              <h2 
                className="text-xl md:text-4xl font-normal text-slate-900 mt-1 mb-2 md:mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Quero <span className="italic text-[#0c7a85]">ajudar!</span>
              </h2>
              <p className="text-slate-600 text-xs md:text-base text-justify leading-relaxed">
                Existem várias formas de colaborar com o Projeto Amor Azul e espalhar amor por onde passamos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              
              <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-sm border border-slate-200/80 hover:border-[#0c7a85]/50 hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-100/80 text-[#0c7a85] rounded-xl flex items-center justify-center text-xl md:text-2xl font-bold mb-3 md:mb-4">🤝</div>
                  <h3 className="font-bold text-base md:text-lg mb-2 text-slate-900">Seja Voluntário</h3>
                  <p className="text-slate-600 text-xs md:text-sm text-justify mb-5 md:mb-6 leading-relaxed">
                    Participe da organização, entrega de doações e eventos presenciais nas comunidades de Moreno e região.
                  </p>
                </div>
                <a
                  href="https://wa.me/5581988888888?text=Ol%C3%A1!%20Gostaria%20de%20me%20tornar%20um%20volunt%C3%A1rio%20do%20Projeto%20Amor%20Azul!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white text-center text-xs font-bold px-4 py-2.5 md:py-3 rounded-xl transition shadow-sm"
                >
                  Falar no WhatsApp
                </a>
              </div>

              <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-sm border border-slate-200/80 hover:border-[#0c7a85]/50 hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-100/80 text-[#0c7a85] rounded-xl flex items-center justify-center text-xl md:text-2xl font-bold mb-3 md:mb-4">🎁</div>
                  <h3 className="font-bold text-base md:text-lg mb-2 text-slate-900">Doação de Itens</h3>
                  <p className="text-slate-600 text-xs md:text-sm text-justify mb-5 md:mb-6 leading-relaxed">
                    Doação de chocolates na Páscoa, Doces no Dia das Crianças e Brinquedos no Natal.
                  </p>
                </div>
                <a
                  href="https://wa.me/5581988888888?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20doa%C3%A7%C3%A3o%20de%20itens%20para%20o%20Projeto%20Amor%20Azul!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white text-center text-xs font-bold px-4 py-2.5 md:py-3 rounded-xl transition shadow-sm"
                >
                  Combinar Doação
                </a>
              </div>

              <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-sm border border-slate-200/80 hover:border-[#0c7a85]/50 hover:shadow-md transition flex flex-col justify-between sm:col-span-2 md:col-span-1">
                <div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-100/80 text-[#0c7a85] rounded-xl flex items-center justify-center text-xl md:text-2xl font-bold mb-3 md:mb-4">💸</div>
                  <h3 className="font-bold text-base md:text-lg mb-2 text-slate-900">Contribuição Financeira</h3>
                  <p className="text-slate-600 text-xs md:text-sm text-justify mb-5 md:mb-6 leading-relaxed">
                    Ajude a custear os insumos e a logística das nossas campanhas através de doações via PIX.
                  </p>
                </div>
                <a
                  href="#doar"
                  className="inline-block bg-[#0c7a85] hover:bg-[#095f68] text-white text-center text-xs font-bold px-4 py-2.5 md:py-3 rounded-xl transition shadow-sm"
                >
                  Ver Chave PIX
                </a>
              </div>

            </div>
          </section>

          {/* DIVISOR */}
          <div className="flex items-center justify-center gap-4 opacity-40 py-1">
            <span className="w-16 h-[1px] bg-[#0c7a85]"></span>
            <span className="text-[#0c7a85] text-lg">📸</span>
            <span className="w-16 h-[1px] bg-[#0c7a85]"></span>
          </div>

          {/* BLOCO 3: NOSSAS CAMPANHAS */}
          <section id="campanhas" className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-12 shadow-sm border border-slate-200/80">
            <div className="text-center max-w-2xl mx-auto mb-6 md:mb-12">
              <span className="text-[#0c7a85] font-bold text-xs uppercase tracking-widest">Histórico de Transformação</span>
              <h2 
                className="text-xl md:text-4xl font-normal text-slate-900 mt-1 mb-2 md:mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Nossas <span className="italic text-[#0c7a85]">Campanhas</span>
              </h2>
              <p className="text-slate-600 text-xs md:text-base text-justify leading-relaxed">
                Clique em uma campanha para ver o histórico e a galeria de fotos das edições realizadas.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-8 text-slate-500 text-xs md:text-sm">Carregando campanhas do Sanity...</div>
            ) : campanhas.length === 0 ? (
              <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 text-xs md:text-sm">
                Nenhuma campanha cadastrada no momento.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {campanhas.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => setModalData(item)}
                    className="bg-slate-50 rounded-xl md:rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-lg hover:border-[#0c7a85]/50 transition cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      {item.imagemCapa ? (
                        <div className="overflow-hidden h-40 md:h-48">
                          <img
                            src={urlFor(item.imagemCapa).url()}
                            alt={item.titulo}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-40 md:h-48 bg-slate-200 flex items-center justify-center text-slate-400 text-xs">
                          Sem foto de capa
                        </div>
                      )}
                      <div className="p-4 md:p-5">
                        <h3 
                          className="text-base md:text-xl font-bold text-slate-900 mb-2"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {item.titulo}
                        </h3>
                        <p className="text-slate-600 text-xs md:text-sm text-justify leading-relaxed">{item.descricaoBreve}</p>
                      </div>
                    </div>
                    <div className="px-4 pb-4 md:px-5 md:pb-5 pt-1">
                      <span className="text-[#0c7a85] font-bold text-xs hover:underline flex items-center gap-1">
                        Ver Ações e Fotos →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* DIVISOR */}
          <div className="flex items-center justify-center gap-4 opacity-40 py-1">
            <span className="w-16 h-[1px] bg-[#0c7a85]"></span>
            <span className="text-[#0c7a85] text-lg">💬</span>
            <span className="w-16 h-[1px] bg-[#0c7a85]"></span>
          </div>

          {/* BLOCO 4: DEPOIMENTOS */}
          <section id="depoimentos" className="bg-[#f2f8f9] rounded-2xl md:rounded-3xl p-5 md:p-12 border border-[#0c7a85]/15 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-[#0c7a85] font-bold text-xs uppercase tracking-widest">Carinho da Comunidade</span>
              <h2 
                className="text-xl md:text-4xl font-normal text-slate-900 mt-1 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Depoimentos & <span className="italic text-[#0c7a85]">Elogios</span>
              </h2>
              <p className="text-slate-600 text-xs md:text-base text-justify leading-relaxed">
                Confira as mensagens que recebemos de quem acompanha de perto o nosso trabalho. Clique para ampliar!
              </p>
            </div>

            {depoimentos.length === 0 ? (
              <div className="text-center py-8 text-slate-500 bg-white rounded-2xl border border-slate-200 text-xs md:text-sm">
                Cadastre os prints dos depoimentos no Sanity Studio para exibi-los aqui.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                {depoimentos.map((dep, idx) => {
                  const imgUrl = urlFor(dep.imagem)?.url();
                  const allDepImages = depoimentos.map(d => urlFor(d.imagem)?.url());
                  return (
                    <div 
                      key={dep._id || idx}
                      onClick={() => openLightbox(allDepImages, idx)}
                      className="bg-white p-2.5 md:p-3 rounded-xl md:rounded-2xl border border-slate-200/80 hover:border-[#0c7a85]/50 transition cursor-pointer shadow-sm hover:shadow-md"
                    >
                      {imgUrl && (
                        <img 
                          src={imgUrl} 
                          alt={dep.nome || 'Print Depoimento'} 
                          className="w-full h-36 sm:h-44 md:h-56 object-contain rounded-lg bg-slate-50"
                        />
                      )}
                      {dep.nome && (
                        <h4 className="font-bold text-slate-800 text-[11px] md:text-sm mt-2 text-center truncate">
                          {dep.nome}
                        </h4>
                      )}
                      {dep.legenda && (
                        <p className="text-slate-500 text-[10px] md:text-xs text-center mt-0.5 truncate">
                          {dep.legenda}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* BLOCO 5: DOAÇÃO PIX */}
          <section id="doar" className="bg-gradient-to-r from-[#0c7a85] to-[#085a62] text-white rounded-2xl md:rounded-3xl p-6 md:p-14 text-center shadow-xl max-w-full overflow-hidden relative">
            <span className="bg-white/15 text-sky-100 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md border border-white/20">
              Transparência e Amor
            </span>
            <h2 
              className="text-xl md:text-4xl font-normal mt-3 mb-2 md:mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Faça uma Doação via <span className="italic font-bold">PIX</span>
            </h2>
            <p className="max-w-xl mx-auto text-sky-100/90 mb-6 text-xs md:text-sm leading-relaxed text-justify">
              Sua contribuição é fundamental para mantermos nossas campanhas de Páscoa, Dia das Crianças e Natal ativas.
            </p>
            <div className="bg-white text-slate-900 inline-flex flex-col sm:flex-row items-center gap-3 md:gap-4 px-5 py-4 rounded-xl md:rounded-2xl shadow-lg max-w-full">
              <div className="text-center sm:text-left">
                <span className="text-[11px] md:text-xs text-slate-500 block mb-0.5">Chave PIX (E-mail)</span>
                <span className="font-mono font-bold text-xs md:text-base text-[#0c7a85] break-all select-all">
                  {pixKey}
                </span>
              </div>
              <button
                onClick={handleCopyPix}
                className={`px-4 py-2.5 md:px-5 md:py-3 rounded-xl font-bold text-xs transition duration-200 flex items-center gap-1.5 shrink-0 ${
                  copiedPix 
                    ? 'bg-green-600 text-white' 
                    : 'bg-[#0c7a85] hover:bg-[#095f68] text-white shadow-md'
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
      <footer className="bg-white border-t border-slate-200/80 mt-12 py-6 text-center text-slate-500 text-xs md:text-sm">
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
          <div className="bg-white rounded-2xl md:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-5 md:p-8">
            <button
              onClick={() => setModalData(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <h2 
              className="text-lg md:text-2xl font-normal text-slate-900 mb-5 border-b pb-3 border-slate-100 pr-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {modalData.titulo} - Edições Realizadas
            </h2>

            {modalData.edicoes && modalData.edicoes.length > 0 ? (
              <div className="space-y-6 md:space-y-8">
                {modalData.edicoes.map((edicao, idx) => {
                  const edicaoImages = edicao.galeria ? edicao.galeria.map(f => urlFor(f).url()) : [];
                  return (
                    <div key={idx} className="border-l-4 border-[#0c7a85] pl-3 md:pl-4 py-1">
                      <h3 className="font-bold text-base md:text-lg text-slate-900">Ano {edicao.ano}</h3>
                      {edicao.descricao && (
                        <p className="text-slate-600 text-xs md:text-sm text-justify mt-1 mb-3 leading-relaxed">{edicao.descricao}</p>
                      )}

                      {edicaoImages.length > 0 && (
                        <div>
                          <h4 className="font-bold text-[11px] md:text-xs uppercase tracking-wider text-slate-500 mb-2">
                            Galeria de Fotos ({edicao.ano}) — Clique para ampliar:
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                            {edicaoImages.map((imgUrl, fIdx) => (
                              <img
                                key={fIdx}
                                src={imgUrl}
                                alt={`Foto ${modalData.titulo} ${edicao.ano}`}
                                onClick={() => openLightbox(edicaoImages, fIdx)}
                                className="w-full h-24 md:h-28 object-cover rounded-lg md:rounded-xl border border-slate-200 hover:scale-105 transition-transform cursor-pointer shadow-sm"
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
              <p className="text-slate-500 text-xs md:text-sm py-4 text-justify">
                Nenhuma edição cadastrada para esta ação ainda.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Lightbox */}
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
              className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-xl shadow-2xl select-none"
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