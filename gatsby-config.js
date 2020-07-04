module.exports = {
  siteMetadata: {
    title: `mightypenguin.dev`,
    name: `mightypenguin.dev`,
    siteUrl: `https://mightypenguin.dev`,
    description: `Victor's lab`,
    hero: {
      heading: `Blog posts`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/MightyPenguinV`,
      },
      {
        name: `github`,
        url: `https://github.com/TheMightyPenguin`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/company/narative/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/blog",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {},
    },
  ],
};
