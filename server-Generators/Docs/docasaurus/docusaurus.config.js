// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'servicestack-reference',
  tagline: 'ServiceStack Reference Documentation',
  url: 'https://reference.servicestack.net',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ServiceStack', // Usually your GitHub org/user name.
  projectName: 'reference-docs', // Usually your repo name.
  scripts: [
      "https://code.iconify.design/iconify-icon/1.0.0/iconify-icon.min.js"
      ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themes: ['docusaurus-theme-search-typesense'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'ServiceStack Reference',
        logo: {
          alt: 'ServiceStack Reference',
          src: 'img/servicestack.svg',
        },
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Features',
            items: [
              {
                label: 'Blazor WASM',
                to: 'https://servicestack.net/blazor',
              },
              {
                label: 'AutoQuery',
                to: 'https://servicestack.net/autoquery',
              },
              {
                label: 'ServiceStack Reference',
                to: 'https://servicestack.net/service-reference',
              },
              {
                label: 'Litestream',
                to: 'https://servicestack.net/litestream',
              },
              {
                label: 'OrmLite',
                to: 'https://servicestack.net/ormlite',
              },
              {
                label: 'Redis',
                to: 'https://servicestack.net/redis',
              },
              {
                label: 'Locode',
                to: 'https://www.locode.dev/',
              },
              {
                label: 'Jamstack',
                to: 'Jamstack',
              },

            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Framework Docs',
                href: 'https://docs.servicestack.net',
              },
              {
                label: 'Customer Forums',
                to: 'https://forums.servicestack.net',
              },
              {
                label: 'ServiceStack.Redis',
                to: 'https://docs.servicestack.net/redis',
              },
              {
                label: 'ServiceStack.OrmLite',
                to: 'https://docs.servicestack.net/ormlite',
              },
              {
                label: 'ServiceStack.Text',
                to: 'https://docs.servicestack.net/text',
              },
              {
                label: 'ServiceStack.Aws',
                to: 'https://docs.servicestack.net/aws',
              },
              {
                label: 'Live Demos',
                to: 'https://github.com/NetCoreApps/LiveDemos',
              },
              {
                label: 'Customer Forums',
                to: 'https://forums.servicestack.net/',
              },
              {
                label: 'Blog',
                to: 'https://servicestack.net/blog',
              }
            ],
          },
          {
            title: 'Learn',
            items: [
              {
                label: 'Why ServiceStack',
                to: 'https://docs.servicestack.net/why-servicestack',
              },
              {
                label: 'Architecture',
                to: 'https://docs.servicestack.net/architecture-overview',
              },
              {
                label: 'Explore ServiceStack',
                href: 'https://docs.servicestack.net/explore-servicestack',
              },
              {
                label: 'API First Development',
                href: 'https://docs.servicestack.net/api-first-development',
              },
              {
                label: 'The Simple POCO Life',
                href: 'https://docs.servicestack.net/service-complexity-and-dto-roles',
              },
              {
                label: 'Training Services',
                href: 'https://servicestack.net/training',
              }
            ],
          },
          {
            title: 'About',
            // Please don't remove the privacy and terms, it's a legal
            // requirement.
            items: [
              {
                label: 'Support',
                href: 'https://servicestack.net/support',
              },
              {
                label: 'What\'s New',
                href: 'https://servicestack.net/whatsnew',
              },
              {
                label: 'Contact Us',
                href: 'https://servicestack.net/#contact',
              },
              {
                label: 'Privacy',
                href: 'https://servicestack.net/privacy',
              },
              {
                label: 'Terms',
                href: 'https://servicestack.net/terms',
              }
            ],
          },
        ],
        logo: {
          alt: 'ServiceStack Logo',
          src: '/img/servicestack.svg',
          href: 'https://servicestack.net',
        },
        copyright: `Copyright © ${new Date().getFullYear()} ServiceStack, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["csharp"],
      },
      typesense: {
        typesenseCollectionName: 'typesense_docs', // Replace with your own doc site's name. Should match the collection name in the scraper settings.

        typesenseServerConfig: {
          nodes: [
            {
              host: 'search.reference.servicestack.net',
              port: 443,
              protocol: 'https',
            }
          ],
          apiKey: 'N4N8bF0XwyvzwCGwm3CKB0QcnwyWtygo',
        },

        // Optional: Typesense search parameters: https://typesense.org/docs/0.21.0/api/search.md#search-parameters
        typesenseSearchParameters: {},

        // Optional
        contextualSearch: false,
      }
    })

};

module.exports = config;
