import { PodcastProps } from "@/app/(podcasty)/podcasts/[slug]/page";
import { createClient, groq } from "next-sanity";
const client = createClient({
  projectId: "k9iiqkx5",
  dataset: "production",
});

export const fetchPodcasts = async () => {
  const query = groq`*[_type == "podcast"] {
    title,
    "audio": audio.asset -> url
  }`;

  return await client.fetch(query);
};

export const fetchPodcast = async (slug: string): Promise<PodcastProps> => {
  const query = groq`*[_type == "podcast" && slug.current == "${slug}"][0] {
    title,
    "author": author -> name,
    "_slug": slug.current,
    "desc": description,
    notes,
    "bannerURL": banner.asset -> url,
    "audioURL": audio.asset -> url,
    "categories": categories[]->title,
  }`;
  return await client.fetch(query);
};
