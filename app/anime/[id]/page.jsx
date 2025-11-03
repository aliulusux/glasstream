import Image from 'next/image';
import Link from 'next/link';
import Comments from '@/components/Comments';
import GlowCard from '@/components/GlowCard';
import { GridSkeleton } from '@/components/Skeletons';

export const dynamic = 'force-dynamic';

async function getAnime(id){
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/jikan/anime/${id}`, { cache: 'no-store' });
    return await r.json();
  } catch { return null; }
}
async function getCharacters(id){
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/jikan/characters/${id}`, { cache: 'no-store' });
    return await r.json();
  } catch { return []; }
}
async function getRelations(id){
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/jikan/relations/${id}`, { cache: 'no-store' });
    const d = await r.json();
    // Flatten related entries to anime array-like
    const rel = [];
    (d||[]).forEach(g => g?.entry?.forEach(e => rel.push({ mal_id: e.mal_id, title: e.name })));
    return rel;
  } catch { return []; }
}

export default async function Page({ params }) {
  const id = params.id;
  const [anime, chars, rel] = await Promise.all([getAnime(id), getCharacters(id), getRelations(id)]);

  if (!anime?.title) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <GridSkeleton count={12}/>
      </div>
    );
  }

  const cover = anime?.images?.jpg?.large_image_url || anime?.images?.jpg?.image_url;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Hero */}
      <GlowCard className="p-4 grid md:grid-cols-[240px_1fr_280px] gap-4 items-start">
        <Image src={cover} alt={anime.title} width={240} height={340} className="rounded-xl object-cover"/>
        <Link
          href={`/anime/${params.aid}/watch`}
          className="inline-block mt-4 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium shadow-md hover:shadow-lg transition"
        >
          ▶️ Watch Episode 1
        </Link>
        <p className="text-white/70 mt-2">{anime.synopsis || 'No synopsis.'}</p>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white">{anime.title}</h1>
          <p className="text-white/70 mt-2">{anime.synopsis || 'No synopsis.'}</p>
          {anime.trailer?.embed_url && (
            <div className="mt-4 aspect-video">
              <iframe
                src={anime.trailer.embed_url}
                className="w-full h-full rounded-xl border border-white/10"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
              />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="rounded-xl bg-white/8 border border-white/15 p-3 text-white/90">
            <div>⭐ Score: <b>{anime.score ?? '-'}</b></div>
            <div>Episodes: <b>{anime.episodes ?? '-'}</b></div>
            <div>Year: <b>{anime.year ?? '-'}</b></div>
            <div>Type: <b>{anime.type ?? '-'}</b></div>
            <div>Rank: <b>{anime.rank ?? '-'}</b></div>
          </div>
        </div>
      </GlowCard>

      {/* Characters */}
      <section>
        <h2 className="text-white font-semibold mb-3">Characters</h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
          {(chars||[]).slice(0,14).map(c => {
            const img = c?.character?.images?.jpg?.image_url;
            return (
              <GlowCard key={c?.character?.mal_id} className="p-2">
                <Image src={img} alt={c?.character?.name} width={180} height={240} className="rounded-lg w-full h-[240px] object-cover"/>
                <div className="mt-2 text-center text-white/90 text-sm">{c?.character?.name}</div>
              </GlowCard>
            );
          })}
        </div>
      </section>

      {/* Related */}
      <section>
        <h2 className="text-white font-semibold mb-3">Related</h2>
        {rel.length === 0 ? (
          <div className="text-white/60">No related titles.</div>
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
            {rel.slice(0,14).map(r => (
              <GlowCard key={r.mal_id} className="p-3">
                <Link href={`/anime/${r.mal_id}`} className="text-white/90 hover:text-white">{r.title}</Link>
              </GlowCard>
            ))}
          </div>
        )}
      </section>

      {/* Comments */}
      <Comments animeId={Number(id)} />
    </div>
  );
}
