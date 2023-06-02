export type Language = {
  code: string;
  name: string;
  title: string;
};

export type Meta = {
  availableLanguages?: Language[] | undefined;
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  "og:title"?: string;
  "og:image"?: string;
  "og:url"?: string;
  "og:site_name"?: string;
  "og:type"?: string;
  "twitter:card"?: string;
  "twitter:site"?: string;
  "msapplication-TileColor"?: string;
  "theme-color"?: string;
  "brand:name"?: string;
  "brand:description"?: string;
  "copyrights:disclaimer"?: string;
  "contact:cta"?: string;
  "contact:title"?: string;
  "contact:link"?: string;
  "linkedin:href"?: string;
  "linkedin:label"?: string;
  "linkedin:title"?: string;
  "love:label"?: string;
  "love:made"?: string;
  "love:with"?: string;
  "love:emoji"?: string;
  "love:link"?: string;
  "love:title"?: string;
};

import base from './_default.json';

const payload:{
  [key: string]: Meta
} = { base }

export default payload;