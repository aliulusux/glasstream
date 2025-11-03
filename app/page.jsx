import Hero from "@/components/Hero";
import Section from "@/components/Section";
import AnimeCard from "@/components/AnimeCard";
import HorizontalScroll from "@/components/HorizontalScroll";
import { getSeasonNow, getRecentEpisodes, getRecentAnime } from "@/lib/jikan";

export default async function Home(){
  const season = await getSeasonNow(1, 12);
  const slides = season.data?.slice(0, 5) || [];
  const recentEp = await getRecentEpisodes(1);
  const recentAnime = await getRecentAnime(1);

  return (
    <div className="pt-4">
      <Hero slides={slides} />
      <Section title="Son Eklenen Bölümler">
        <HorizontalScroll>
          {(recentEp.data||[]).slice(0,12).map((e,idx)=>{
            const a = e.entry || e;
            return <div className="min-w-[200px]" key={idx}><AnimeCard a={a} tag="Yeni Bölüm" /></div>;
          })}
        </HorizontalScroll>
      </Section>
      <Section title="Bu Sezon Popüler">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {(season.data||[]).slice(0,18).map(a => <AnimeCard key={a.mal_id} a={a} tag="Season" />)}
        </div>
      </Section>
      <Section title="Son Eklenen Animeler">
        <HorizontalScroll>
          {(recentAnime.data||[]).slice(0,12).map(a => <div className="min-w-[200px]" key={a.mal_id}><AnimeCard a={a} tag="Yeni" /></div>)}
        </HorizontalScroll>
      </Section>
    </div>
  );
}
