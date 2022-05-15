import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
  projectId: "33z1to07",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
  token: process.env.WEBBX_SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
