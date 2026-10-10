export default {
  name: 'campanha',
  title: 'Campanhas e Ações',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título da Ação/Campanha',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'descricaoBreve',
      title: 'Descrição Breve',
      type: 'text',
      rows: 3,
    },
    {
      name: 'imagemCapa',
      title: 'Foto de Capa',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'galeria',
      title: 'Galeria de Fotos da Ação',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'dataAcao',
      title: 'Data da Ação',
      type: 'date',
    },
  ],
};