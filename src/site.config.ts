// Everything about the site's identity lives here. Change it once and the
// header, footer, About page, RSS feed and social previews follow.

export const SITE = {
  name: 'Sitecore Insights',
  tagline: 'Practical notes on building with Sitecore',
  description:
    'An independent blog about building with Sitecore: SitecoreAI, headless development with Next.js, Marketplace apps, publishing, security and integrations.',
  author: 'Roberto Barbedo',
  authorRole: 'Sitecore architect, three-time Sitecore Technology MVP',
  locale: 'en',
  // Leave a link empty to hide it.
  links: {
    github: '',
    linkedin: '',
    x: '',
  },
};

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/blog/', label: 'Archive' },
  { href: '/tags/', label: 'Topics' },
  { href: '/about/', label: 'About' },
];

// Shown as a pill on each post so readers know who it's written for.
export const AUDIENCES = {
  developers: 'Developers',
  business: 'Business users',
} as const;

export type Audience = keyof typeof AUDIENCES;

// Posts I wrote for other sites. They appear in the post lists with their
// original dates and link to the original.
export const ELSEWHERE = [
  {
    title: "Running the SitecoreAI starter kit without NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID",
    href: 'https://www.getfishtank.com/insights/keep-your-sitecore-context-id-out-of-the-browser',
    date: '2026-07-27',
    source: 'Fishtank',
    summary: "How to keep the Experience Edge Context ID out of the browser in a SitecoreAI Next.js site by moving the calls to the server.",
    tags: ['sitecoreai', 'nextjs', 'security'],
  },
  {
    title: "Publishing Center for SitecoreAI",
    href: 'https://www.getfishtank.com/insights/publishing-center-for-sitecoreai',
    date: '2026-05-22',
    source: 'Fishtank',
    summary: "A Marketplace extension that shows authors the publishing status of the page they are editing and lets them publish it from Page Builder.",
    tags: ['marketplace', 'sitecoreai', 'publishing', 'page-builder'],
  },
  {
    title: "How to add Last Updated Timestamp in Sitecore sites with Next.js",
    href: 'https://www.getfishtank.com/insights/how-to-add-last-updated-timestamp-in-sitecore-sites-with-nextjs',
    date: '2026-03-16',
    source: 'Fishtank',
    summary: "Reading the __Updated field through GraphQL and exposing it as a meta tag or HTTP header in Next.js.",
    tags: ['nextjs', 'graphql'],
  },
  {
    title: "Processing Sitecore webhook events with Trigger.dev",
    href: 'https://www.getfishtank.com/insights/processing-sitecore-webhook-events-with-trigger-dev',
    date: '2026-03-13',
    source: 'Fishtank',
    summary: "Moving heavy webhook work into Trigger.dev background jobs, with a search indexing example.",
    tags: ['webhooks', 'integrations'],
  },
  {
    title: "Sitecore XM Cloud Marketplace: Reading and Changing Items with GraphQL",
    href: 'https://www.getfishtank.com/insights/sitecore-xm-cloud-marketplace-reading-and-changing-items-with-graphql',
    date: '2025-10-30',
    source: 'Fishtank',
    summary: "Using the Marketplace SDK to run Authoring GraphQL queries and mutations from an extension.",
    tags: ['marketplace', 'xm-cloud', 'graphql'],
  },
  {
    title: "Creating a Marketplace Custom Table Field in Sitecore XM Cloud Page Builder",
    href: 'https://www.getfishtank.com/insights/creating-a-marketplace-custom-table-field-in-sitecore-xm-cloud-page-builder',
    date: '2025-10-30',
    source: 'Fishtank',
    summary: "Building a Marketplace custom field that lets authors paste tables from a spreadsheet into a component.",
    tags: ['marketplace', 'xm-cloud', 'page-builder'],
  },
  {
    title: "SiteKit CLI – Enable AI to Build Sitecore Items with Templates",
    href: 'https://www.getfishtank.com/insights/sitekit-cli-enable-ai-to-build-sitecore-items-with-templates',
    date: '2025-09-26',
    source: 'Fishtank',
    summary: "A command-line tool that creates Sitecore page types, components and dictionary items from YAML files.",
    tags: ['tooling', 'ai', 'xm-cloud'],
  },
  {
    title: "Efficient Media Migration in Sitecore Using PowerShell and Packages",
    href: 'https://www.getfishtank.com/insights/efficient-media-migration-in-sitecore-using-powershell-and-packages',
    date: '2025-06-18',
    source: 'Fishtank',
    summary: "A two-script PowerShell approach for moving large media libraries between environments with small packages.",
    tags: ['powershell', 'content-migration'],
  },
  {
    title: "Sitecore XM Cloud PowerShell Receive-File Returning \"cancel\"",
    href: 'https://www.getfishtank.com/insights/sitecore-xm-cloud-powershell-receive-file-returning-cancel',
    date: '2025-05-27',
    source: 'Fishtank',
    summary: "Why Receive-File returns \"cancel\" in XM Cloud when a file type is not allowed, and the config patch that fixes it.",
    tags: ['powershell', 'xm-cloud'],
  },
  {
    title: "Leveraging Sitecore Out-of-the-Box Item Security for Headless Applications",
    href: 'https://www.getfishtank.com/insights/leveraging-sitecore-out-of-the-box-item-security-for-headless-applications',
    date: '2025-05-23',
    source: 'Fishtank',
    summary: "Using Sitecore's standard item security to protect pages in a headless Next.js site.",
    tags: ['security', 'nextjs'],
  },
  {
    title: "Distinguishing Language Fallback Content in Sitecore GraphQL Queries",
    href: 'https://www.getfishtank.com/insights/distinguishing-language-fallback-content-in-sitecore-graphql-queries',
    date: '2025-05-13',
    source: 'Fishtank',
    summary: "A way to tell from a GraphQL result whether a language version is real or comes from language fallback.",
    tags: ['graphql', 'multilingual'],
  },
  {
    title: "Sitecore Environment-Specific Items: Introducing \"Item Patching\"",
    href: 'https://www.getfishtank.com/insights/sitecore-environment-specific-items-introducing-item-patching',
    date: '2025-05-06',
    source: 'Fishtank',
    summary: "A module that keeps per-environment field values next to the item and applies them automatically.",
    tags: ['configuration', 'content-migration'],
  },
  {
    title: "Custom Icons for Components in Sitecore XM Cloud Page Builder",
    href: 'https://www.getfishtank.com/insights/custom-icons-for-components-in-sitecore-xm-cloud-page-builder',
    date: '2025-05-01',
    source: 'Fishtank',
    summary: "Adding your own icons to components in Page Builder with a PowerShell script in the Content Editor ribbon.",
    tags: ['page-builder', 'powershell', 'xm-cloud'],
  },
  {
    title: "Simplifying content security and workflow initial setup in Sitecore",
    href: 'https://www.getfishtank.com/insights/simplifying-content-security-and-workflow-initial-setup-in-sitecore',
    date: '2025-04-21',
    source: 'Fishtank',
    summary: "A PowerShell script that creates the roles, workflow and item security a new site needs.",
    tags: ['security', 'workflow', 'powershell'],
  },
  {
    title: "Sitecore Rendering Parameters Base Templates and Page Builder Support",
    href: 'https://www.getfishtank.com/insights/sitecore-rendering-parameters-base-templates-and-page-builder-support',
    date: '2025-04-08',
    source: 'Fishtank',
    summary: "Which rendering parameter base templates matter in Page Builder, and the base templates I use for components.",
    tags: ['page-builder', 'xm-cloud'],
  },
  {
    title: "Sitecore XM Cloud New Release for Content Editing in Page Builder",
    href: 'https://www.getfishtank.com/insights/sitecore-xm-cloud-new-release-for-content-editing-in-page-builder',
    date: '2025-02-24',
    source: 'Fishtank',
    summary: "A look at the new content editing in Page Builder: what it supports, what is missing, and a script to find unsupported fields.",
    tags: ['page-builder', 'xm-cloud'],
  },
];
