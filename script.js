// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. FUNÇÃO PARA COPIAR CHAVE PIX ---
  const btnCopiarPix = document.getElementById('btn-copiar-pix');
  const chavePixInput = document.getElementById('chave-pix');
  const mensagemCopia = document.getElementById('mensagem-copia');

  if (btnCopiarPix && chavePixInput) {
    btnCopiarPix.addEventListener('click', () => {
      // Seleciona e copia o texto da chave PIX
      chavePixInput.select();
      chavePixInput.setSelectionRange(0, 99999); // Para dispositivos móveis

      navigator.clipboard.writeText(chavePixInput.value)
        .then(() => {
          if (mensagemCopia) {
            mensagemCopia.textContent = '✅ Chave PIX copiada com sucesso!';
            mensagemCopia.classList.remove('hidden');
            setTimeout(() => {
              mensagemCopia.classList.add('hidden');
            }, 3000);
          } else {
            alert('Chave PIX copiada com sucesso!');
          }
        })
        .catch(err => {
          console.error('Erro ao copiar a chave PIX: ', err);
          alert('Não foi possível copiar automaticamente. Copie manualmente.');
        });
    });
  }

  // --- 2. CONTROLE DO MODAL DE DOAÇÃO ---
  const btnAbrirModal = document.querySelectorAll('.btn-doar');
  const modalDoacao = document.getElementById('modal-doacao');
  const btnFecharModal = document.getElementById('btn-fechar-modal');

  if (modalDoacao) {
    // Abrir Modal
    btnAbrirModal.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalDoacao.classList.remove('hidden');
        modalDoacao.classList.add('flex');
      });
    });

    // Fechar Modal no Botão
    if (btnFecharModal) {
      btnFecharModal.addEventListener('click', () => {
        modalDoacao.classList.add('hidden');
        modalDoacao.classList.remove('flex');
      });
    }

    // Fechar Modal clicando fora do conteúdo
    window.addEventListener('click', (e) => {
      if (e.target === modalDoacao) {
        modalDoacao.classList.add('hidden');
        modalDoacao.classList.remove('flex');
      }
    });
  }

  // --- 3. ENVIO DO FORMULÁRIO DE VOLUNTÁRIO / CONTATO ---
  const formContato = document.getElementById('form-contato');

  if (formContato) {
    formContato.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome')?.value || '';
      const email = document.getElementById('email')?.value || '';

      if (nome && email) {
        alert(`Obrigado pelo seu interesse, ${nome}! Entraremos em contato em breve.`);
        formContato.reset();
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    });
  }

  // --- 4. ROLAGEM SUAVE (SMOOTH SCROLL) ---
  const linksAnncora = document.querySelectorAll('a[href^="#"]');

  linksAnncora.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

});