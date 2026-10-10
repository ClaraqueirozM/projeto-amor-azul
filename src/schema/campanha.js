export default {
  name: 'campanha',
  title: 'Campanhas e Ações',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Nome da Ação (Ex: Páscoa, Natal, Dia das Crianças)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'imagemCapa',
      title: 'Foto de Capa do Card Principal',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'descricaoBreve',
      title: 'Descrição Resumida do Card',
      type: 'text',
      rows: 2,
    },
    {
      name: 'edicoes',
      title: 'Edições Realizadas (Divididas por Ano)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'edicaoAno',
          title: 'Edição do Ano',
          fields: [
            {
              name: 'ano',
              title: 'Ano (Ex: 2025, 2024)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'descricao',
              title: 'O que foi feito nesse ano',
              type: 'text',
              rows: 3,
            },
            {
              name: 'galeria',
              title: 'Fotos da Ação neste Ano',
              type: 'array',
              of: [{ type: 'image' }],
            },
          ],
        },
      ],
    },
  ],
};