import "server-only";

// Rodrigo Góes — https://www.youtube.com/@rodrigo
export const CHANNEL_ID = "UCU_q46MCMEu5l2QdshV0hGQ";
export const CHANNEL_URL = "https://www.youtube.com/@rodrigo";
export const CHANNEL_VIDEOS_URL = "https://www.youtube.com/@rodrigo/videos";

export type Video = {
  id: string;
  title: string;
  url: string;
  thumb: string;
  published: string;
};

function decode(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

export async function getLatestVideos(limit = 3): Promise<Video[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(4000) },
    );
    if (!res.ok) return [];
    const xml = await res.text();

    const videos: Video[] = [];
    for (const entry of xml.split("<entry>").slice(1)) {
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      if (!id || !title || !published) continue;
      videos.push({
        id,
        title: decode(title),
        url: `https://www.youtube.com/watch?v=${id}`,
        thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        published,
      });
      if (videos.length >= limit) break;
    }
    return videos;
  } catch {
    return [];
  }
}
