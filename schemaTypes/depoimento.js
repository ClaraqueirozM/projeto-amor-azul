export default {
  name: 'depoimento',
  title: 'Depoimento / Elogio',
  type: 'document',
  fields: [
    {
      name: 'nome',
      title: 'Nome da Pessoa / Perfil',
      type: 'string',
      description: 'Ex: @maria_silva ou Comentário do Instagram',
    },
    {
      name: 'imagem',
      title: 'Print / Foto do Comentário',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'legenda',
      title: 'Legenda Breve (Opcional)',
      type: 'string',
      description: 'Ex: Mensagem enviada após a Ação de Natal',
    },
  ],
};