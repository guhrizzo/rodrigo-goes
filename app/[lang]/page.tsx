import { notFound } from "next/navigation";
import { getDictionary } from "./dictionaries";
import { hasLocale } from "./locales";
import { getLatestVideos, CHANNEL_URL, CHANNEL_VIDEOS_URL } from "./youtube";
import { Icon } from "./icons";
import PosterScene from "./PosterScene";
import LangSwitcher from "./LangSwitcher";
import Reveal from "./Reveal";

const SOCIAL = {
  youtube: CHANNEL_URL,
  instagram: "https://www.instagram.com/rodrigoamgoes",
  tiktok: "https://www.tiktok.com/@rodrigo",
  x: "https://x.com/goes_rodrigom",
};

const DATE_LOCALE: Record<string, string> = { pt: "pt-BR", en: "en-US", es: "es-ES" };

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>;
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  const videos = await getLatestVideos(3);
  const fmtDate = (iso: string) =>
    new Intl.DateTimeFormat(DATE_LOCALE[lang], { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso));

  return (
    <main>
      <Reveal />
      <header className="poster" id="top">
        <PosterScene />
        <div className="poster-figure">
          <img src="/rodrigo-avatar.png" alt="Rodrigo Góes" width={720} height={720} />
        </div>
        <span className="poster-badge">{t.poster.badge1}<br /><em>{t.poster.badge2}</em></span>
        <div className="shell">
          <nav className="nav on-cyan">
            <a className="brand" href="#top" aria-label="Rodrigo Góes">RG<span>.</span></a>
            <div className="nav-links">
              <a href="#videos">{t.nav.content}</a><a href="#natural">{t.nav.natural}</a><a href="#sobre">{t.nav.about}</a>
            </div>
            <LangSwitcher current={lang} />
          </nav>
        </div>
        <div className="poster-inner shell">
          <div className="poster-social">
            <a href={SOCIAL.youtube} target="_blank" rel="noreferrer"><Icon name="youtube" /> @rodrigo</a><a href={SOCIAL.instagram} target="_blank" rel="noreferrer"><Icon name="instagram" /> @rodrigoamgoes</a><a href={SOCIAL.tiktok} target="_blank" rel="noreferrer"><Icon name="tiktok" /> @rodrigo</a><a href={SOCIAL.x} target="_blank" rel="noreferrer"><Icon name="x" /> @goes_rodrigom</a>
          </div>
          <div className="poster-stage">
            <span className="poster-word">Rodrigo</span>
            <span className="poster-word">Góes</span>
          </div>
          <p className="poster-tag">{t.poster.tag}</p>
        </div>
      </header>

      <section className="intro shell">
        <div data-reveal>
          <p className="eyebrow">{t.intro.eyebrow}</p>
          <h1>{t.intro.h1[0]}<br /><em>{t.intro.h1[1]}</em><br />{t.intro.h1[2]}</h1>
        </div>
        <div data-reveal>
          <p className="intro-lede">{t.intro.lede}</p>
          <div className="hero-actions"><a className="button button-lime" href={CHANNEL_URL} target="_blank" rel="noreferrer">{t.intro.watch} <Arrow /></a><a className="text-link" href="#sobre">{t.intro.know} <Arrow /></a></div>
        </div>
      </section>

      <section className="stats"><div className="shell" data-reveal><p className="section-kicker">{t.stats.kicker}</p><div className="stats-grid">{t.stats.items.map((s) => <div key={s.label}><strong>{s.value}<span>+</span></strong><small>{s.label}</small></div>)}</div></div></section>

      <section id="videos" className="section shell">
        <div className="section-heading" data-reveal>
          <div><p className="section-kicker">{t.videos.kicker}</p><h2>{t.videos.title[0]}<br /><em>{t.videos.title[1]}</em></h2></div>
          <a className="text-link" href={CHANNEL_VIDEOS_URL} target="_blank" rel="noreferrer">{t.videos.all} <Arrow /></a>
        </div>
        <div className="video-grid">
          {videos.length > 0
            ? videos.map((v) => (
                <a className="video-card" data-reveal href={v.url} target="_blank" rel="noreferrer" key={v.id}>
                  <div className="video-art"><img src={v.thumb} alt="" loading="lazy" /><b>▶</b></div>
                  <p>{v.title}</p>
                  <small>{fmtDate(v.published)} · {t.videos.watch} <Arrow /></small>
                </a>
              ))
            : t.videos.items.map((video) => (
                <article className="video-card" data-reveal key={video.title}>
                  <div className="video-art is-graphic"><b>▶</b><i>{video.category}</i></div>
                  <p>{video.title}</p>
                  <small>{t.videos.watch} <Arrow /></small>
                </article>
              ))}
        </div>
      </section>

      <section id="natural" className="feature"><div className="feature-graphic" aria-hidden="true"><span>?</span><span>?</span></div><div className="feature-copy" data-reveal><p className="section-kicker">{t.feature.kicker}</p><h2>{t.feature.title[0]}<span>{t.feature.title[1]}</span><em>{t.feature.title[2]}</em></h2><p>{t.feature.text}</p><a className="button button-outline" href="#videos">{t.feature.cta} <Arrow /></a></div></section>

      <section id="sobre" className="about shell">
        <div className="about-head" data-reveal><p className="section-kicker">{t.about.kicker}</p><h2>{t.about.title[0]}<br /><em>{t.about.title[1]}</em></h2></div>
        <div className="about-body">
          <img className="about-portrait" src="/rodrigo-avatar.jpg" alt="Rodrigo Góes" width={720} height={720} loading="lazy" data-reveal />
          <div className="about-copy" data-reveal><p className="lead">{t.about.lead}</p><p>{t.about.text}</p><a className="text-link" href="#contato">{t.about.link} <Arrow /></a></div>
        </div>
      </section>

      <section className="library shell"><div className="section-heading" data-reveal><div><p className="section-kicker">{t.library.kicker}</p><h2>{t.library.title[0]}<br /><em>{t.library.title[1]}</em></h2></div><a className="text-link" href="#artigos">{t.library.explore} <Arrow /></a></div><div className="topic-list">{t.library.items.map((topic, i) => <a href="#artigos" className="topic" data-reveal key={topic.title}><span>{String(i + 1).padStart(2, "0")}</span><strong>{topic.title}</strong><p>{topic.desc}</p><Arrow /></a>)}</div></section>

      <section id="artigos" className="articles shell"><div data-reveal><p className="section-kicker">{t.articles.kicker}</p><h2>{t.articles.title[0]}<br /><em>{t.articles.title[1]}</em></h2></div><div className="article-list">{t.articles.items.map((article, i) => <a href="#artigos" className="article" data-reveal key={article}><span>{String(i + 1).padStart(2, "0")}</span><strong>{article}</strong><small>{t.articles.read} <Arrow /></small></a>)}</div></section>

      <section id="contato" className="contact"><div className="shell" data-reveal><p className="section-kicker">{t.contact.kicker}</p><h2>{t.contact.title[0]}<br />{t.contact.title[1]} <em>{t.contact.title[2]}</em></h2><a className="button button-lime" href="mailto:contato@rodrigogoes.com">{t.contact.cta} <Arrow /></a></div></section>

      <footer className="footer"><div className="shell"><div><a className="brand" href="#top">RG<span>.</span></a><p>{t.footer.tagline}</p></div><div className="footer-links"><a href={SOCIAL.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><Icon name="youtube" /> YouTube</a><a href={SOCIAL.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" /> Instagram</a><a href={SOCIAL.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"><Icon name="tiktok" /> TikTok</a><a href={SOCIAL.x} target="_blank" rel="noreferrer" aria-label="X (Twitter)"><Icon name="x" /> Twitter</a></div><div className="footer-meta"><a href="mailto:contato@rodrigogoes.com">{t.footer.contact}</a><p>{t.footer.rights}</p></div></div></footer>
    </main>
  );
}
