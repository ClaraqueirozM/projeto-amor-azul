import React, { useState, useEffect } from 'react';
import { client, urlFor } from './sanity';

const dadosCampanhas = {
  pascoa: {
    titulo: "🍫 Páscoa Solidária - Edições Realizadas",
    historico: [
      { ano: "2025", descricao: "Distribuímos mais de 150 caixas de bombons e organizamos uma caça aos ovos para as crianças." },
      { ano: "2024", descricao: "Primeira edição da Páscoa do projeto! Arrecadamos doações e entregamos lembrancinhas de chocolate." }
    ]
  },
  criancas: {
    titulo: "🎈 Dia das Crianças - Edições Realizadas",
    historico: [
      { ano: "2025", descricao: "Um dia inesquecível com cama elástica, pintura facial, pipoca e distribuição de 200 brinquedos." }
    ]
  },
  natal: {
    titulo: "🎁 Natal Azul - Edições Realizadas",
    historico: [
      { ano: "2025", descricao: "Apadrinhamos 80 cartinhas de Natal, entregando brinquedos novos e cestas básicas." }
    ]
  }
};

export default function App() {
  const [modalData, setModalData] = useState(null);
  const [pixCopiado, setPixCopiado] = useState(false);
  const [campanhasSanity, setCampanhasSanity] = useState([]);
  const chavePix = "amorazulprojetosocial@gmail.com";

  // Busca as campanhas cadastradas no Sanity
  useEffect(() => {
    client
      .fetch(`*[_type == "campanha"] | order(dataAcao desc)`)
      .then((data) => {
        if (data) setCampanhasSanity(data);
      })
      .catch((err) => console.error("Erro ao carregar dados do Sanity:", err));
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copiarPix = () => {
    navigator.clipboard.writeText(chavePix);
    setPixCopiado(true);
    setTimeout(() => setPixCopiado(false), 3000);
  };

  const getImageUrl = (imageSource) => {
    try {
      return imageSource ? urlFor(imageSource).width(600).url() : '';
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* Navbar Fixo */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="text-xl font-bold text-blue-700 hover:opacity-80 transition cursor-pointer"
          >
            💙 Projeto <span className="text-blue-500">Amor Azul</span>
          </button>
          <nav className="space-x-6">
            <button onClick={() => scrollToSection('sobre')} className="hover:text-blue-600 transition font-medium cursor-pointer">Qual nossa missão e quem somos?</button>
            <button onClick={() => scrollToSection('tutorial')} className="hover:text-blue-600 transition font-medium cursor-pointer">Quero ajudar!</button>
            <button onClick={() => scrollToSection('campanhas')} className="hover:text-blue-600 transition font-medium cursor-pointer">Nossas campanhas.</button>
            <button onClick={() => scrollToSection('ajudar')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer">Como doar?!</button>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Missão</h1>
          <p className="text-lg mb-8 opacity-90">Espalhar solidariedade, alegria e amor!</p>
          <div className="flex justify-center gap-4">
            <button onClick={() => scrollToSection('ajudar')} className="bg-white text-blue-700 font-bold px-6 py-3 rounded-lg shadow hover:bg-slate-100 transition cursor-pointer">
              Quero Ajudar
            </button>
            <button onClick={() => scrollToSection('campanhas')} className="bg-blue-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-900 transition cursor-pointer">
              Conheça Nossas Ações
            </button>
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className="max-w-4xl mx-auto px-4 py-16 text-center scroll-mt-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Sobre o Projeto</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          O <strong className="text-blue-600">Projeto Amor Azul</strong> nasceu do desejo de fazer a diferença na vida das crianças da nossa comunidade. Realizamos ações solidárias focadas em datas festivas, garantindo apoio, alegria e dignidade para quem mais precisa.
        </p>
      </section>

      {/* Passo a Passo */}
      <section id="tutorial" className="max-w-5xl mx-auto px-4 py-16 bg-white rounded-2xl border border-blue-200 my-8 shadow-sm scroll-mt-20">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">Como Ajudar — Passo a Passo</h2>
        <p className="text-center text-blue-600 mb-12">Veja como é simples fazer a diferença na vida das crianças do projeto.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">1</div>
            <h3 className="font-bold text-lg mb-2">Escolha uma Ação</h3>
            <p className="text-slate-600 text-sm">Conheça nossas campanhas ativas de Páscoa, Dia das Crianças ou Natal.</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">2</div>
            <h3 className="font-bold text-lg mb-2">Faça sua Doação</h3>
            <p className="text-slate-600 text-sm">Copie nossa chave PIX e contribua com qualquer valor com total segurança. Pix: {chavePix}</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">3</div>
            <h3 className="font-bold text-lg mb-2">Acompanhe as Entregas</h3>
            <p className="text-slate-600 text-sm">Acompanhe pelas redes sociais as fotos e relatórios de tudo o que foi arrecadado.</p>
          </div>
        </div>
      </section>

      {/* Seção Campanhas */}
      <section id="campanhas" className="bg-slate-100 py-16 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Ações Realizadas</h2>
          <p className="text-slate-600 mb-10">Clique em uma campanha para ver as fotos e o histórico das edições anteriores.</p>

          {/* Se houver campanhas cadastradas no Sanity, exibe elas dinamicamente com imagem */}
          {campanhasSanity.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6 text-left mb-10">
              {campanhasSanity.map((item) => (
                <div 
                  key={item._id}
                  onClick={() => setModalData({
                    titulo: item.titulo,
                    descricao: item.descricaoBreve,
                    galeria: item.galeria
                  })}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-slate-200 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {item.imagemCapa && (
                      <img 
                        src={getImageUrl(item.imagemCapa)} 
                        alt={item.titulo} 
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-slate-900">{item.titulo}</h3>
                      {item.dataAcao && (
                        <p className="text-xs font-bold text-blue-600 mb-2">
                          📅 {new Date(item.dataAcao).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                      <p className="text-slate-600 text-sm mb-4">{item.descricaoBreve}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <span className="text-blue-600 font-semibold text-sm hover:underline">Ver Ações e Fotos →</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Cards Estáticos Padrão */
            <div className="grid md:grid-cols-3 gap-6">
              <div onClick={() => setModalData(dadosCampanhas.pascoa)} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-slate-200">
                <div className="text-4xl mb-3">🍫</div>
                <h3 className="text-xl font-bold mb-2">Páscoa Solidária</h3>
                <p className="text-slate-600 text-sm mb-4">Arrecadação de chocolates e ovos de Páscoa para adoçar o dia das crianças e registros de entrega.</p>
                <span className="text-blue-600 font-semibold hover:underline">Ver Ações Realizadas →</span>
              </div>

              <div onClick={() => setModalData(dadosCampanhas.criancas)} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-slate-200">
                <div className="text-4xl mb-3">🎈</div>
                <h3 className="text-xl font-bold mb-2">Dia das Crianças</h3>
                <p className="text-slate-600 text-sm mb-4">Gincanas, brincadeiras e distribuição de brinquedos na comunidade.</p>
                <span className="text-blue-600 font-semibold hover:underline">Ver Ações Realizadas →</span>
              </div>

              <div onClick={() => setModalData(dadosCampanhas.natal)} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-slate-200">
                <div className="text-4xl mb-3">🎁</div>
                <h3 className="text-xl font-bold mb-2">Natal!</h3>
                <p className="text-slate-600 text-sm mb-4">Presentes e ações festivas de fim de ano.</p>
                <span className="text-blue-600 font-semibold hover:underline">Ver Ações Realizadas →</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal Dinâmico com suporte para Histórico e Fotos */}
      {modalData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full rounded-xl p-6 relative shadow-xl max-h-[85vh] overflow-y-auto">
            <button onClick={() => setModalData(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl font-bold cursor-pointer">&times;</button>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{modalData.titulo}</h3>
            
            {modalData.descricao && (
              <p className="text-slate-600 text-sm mb-4">{modalData.descricao}</p>
            )}

            {modalData.historico && (
              <div className="space-y-4">
                {modalData.historico.map((item, idx) => (
                  <div key={idx} className="border-l-4 border-blue-600 pl-4 py-1">
                    <h4 className="font-bold text-slate-800">Ano {item.ano}</h4>
                    <p className="text-slate-600 text-sm">{item.descricao}</p>
                  </div>
                ))}
              </div>
            )}

            {modalData.galeria && modalData.galeria.length > 0 && (
              <div className="mt-4">
                <h4 className="font-bold text-slate-800 mb-2">Galeria de Fotos:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {modalData.galeria.map((foto, idx) => (
                    <img 
                      key={idx} 
                      src={getImageUrl(foto)} 
                      alt={`Foto ${idx + 1}`} 
                      className="w-full h-28 object-cover rounded-lg border border-slate-200"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Como Ajudar / PIX */}
      <section id="ajudar" className="max-w-4xl mx-auto px-4 py-16 text-center scroll-mt-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Como Ajudar</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 max-w-md mx-auto shadow-sm">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Faça uma Doação via PIX</h3>
          <p className="text-sm text-slate-600 mb-6">Qualquer valor ajuda a comprar brinquedos, alimentos e doces para as próximas ações.</p>
          
          <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-2 mb-2">
            <span className="text-sm font-semibold text-slate-700 truncate">{chavePix}</span>
            <button onClick={copiarPix} className={`px-4 py-2 text-sm font-bold text-white rounded-md transition cursor-pointer ${pixCopiado ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {pixCopiado ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          {pixCopiado && <p className="text-xs text-green-600 font-medium">✓ Chave PIX copiada para a área de transferência!</p>}
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm border-t border-slate-800">
        <p>&copy; Projeto Amor Azul. Criado com dedicação para a comunidade.</p>
      </footer>

    </div>
  );
}