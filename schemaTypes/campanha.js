export default {
  name: 'campanha',
  title: 'Campanha',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título da Campanha',
      type: 'string',
    },
    {
      name: 'descricaoBreve',
      title: 'Descrição Breve',
      type: 'text',
    },
    {
      name: 'imagemCapa',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'edicoes',
      title: 'Edições Realizadas (Anos)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'ano', title: 'Ano', type: 'string' },
            { name: 'descricao', title: 'Descrição da Edição', type: 'text' },
            {
              name: 'galeria',
              title: 'Galeria de Fotos',
              type: 'array',
              of: [{ type: 'image' }],
            },
          ],
        },
      ],
    },
  ],
};