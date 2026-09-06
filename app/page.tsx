const videos = [
  { category: "NATURAL OU FAKE NATTY?", title: "O físico que ninguém consegue explicar", number: "01" },
  { category: "NUTRIÇÃO", title: "Creatina: o que realmente importa", number: "02" },
  { category: "BODYBUILDING", title: "A verdade sobre construir músculos", number: "03" },
];

const topics = [
  ["01", "Nutrição", "Alimentação, dieta e composição corporal."],
  ["02", "Bodybuilding", "Treino, físico e construção muscular."],
  ["03", "Mitos", "O que é verdade e o que é bullshit."],
  ["04", "Naturalidade", "Natty versus Fake Natty."],
  ["05", "Saúde", "Informação para quem leva o corpo a sério."],
];

const articles = ["Creatina realmente funciona?", "Como saber se alguém é natural?", "Quanto de proteína você realmente precisa?"];

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>;
}

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="Rodrigo Góes, início">RG<span>.</span></a>
        <div className="nav-links">
          <a href="#videos">Conteúdo</a><a href="#natural">Natural ou Fake Natty?</a><a href="#sobre">Sobre</a>
        </div>
        <div className="nav-social"><a href="https://youtube.com" target="_blank" rel="noreferrer">YT</a><a href="https://instagram.com" target="_blank" rel="noreferrer">IG</a></div>
      </nav>

      <section id="top" className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">Nutricionista · Atleta · Criador</p>
          <h1>Natural.<br /><em>Ciência.</em><br />Humor.</h1>
          <p className="hero-lede">O mundo do bodybuilding sem enrolação — informação, provocação e uma dose de Rodrigo Góes.</p>
          <div className="hero-actions"><a className="button button-lime" href="https://youtube.com" target="_blank" rel="noreferrer">Assistir no YouTube <Arrow /></a><a className="text-link" href="#sobre">Conhecer o Rodrigo <Arrow /></a></div>
        </div>
        <div className="hero-image-wrap"><div className="hero-tag">01 / 05<br /><span>THE OFFICIAL HUB</span></div><img src="/rodrigo-hero.png" alt="Retrato editorial de Rodrigo Góes" className="hero-image" /><div className="hero-caption">RODRIGO<br />GÓES<span>®</span></div></div>
        <div className="hero-scroll">Scroll to explore <span>↓</span></div>
      </section>

      <section className="stats shell"><p className="section-kicker">A dimensão da conversa</p><div className="stats-grid"><div><strong>1.7M<span>+</span></strong><small>Inscritos no YouTube</small></div><div><strong>430M<span>+</span></strong><small>Visualizações</small></div><div><strong>2M<span>+</span></strong><small>Seguidores nas redes</small></div><div><strong>1.000<span>+</span></strong><small>Vídeos publicados</small></div></div></section>

      <section id="videos" className="section shell"><div className="section-heading"><div><p className="section-kicker">O conteúdo que está dando o que falar</p><h2>Últimos<br /><em>vídeos.</em></h2></div><a className="text-link" href="https://youtube.com" target="_blank" rel="noreferrer">Ver todos os vídeos <Arrow /></a></div><div className="video-grid">{videos.map((video) => <article className="video-card" key={video.number}><div className="video-art"><span>{video.number}</span><b>▶</b><i>{video.category}</i></div><p>{video.title}</p><small>ASSISTIR <Arrow /></small></article>)}</div></section>

      <section id="natural" className="feature"><div className="feature-image"><img src="/rodrigo-hero.png" alt="Rodrigo Góes em composição de alto contraste" /></div><div className="feature-copy"><p className="section-kicker">O quadro que virou referência</p><h2>Natural<br /><span>or</span><br /><em>Fake Natty?</em></h2><p>Rodrigo analisa físicos, questiona histórias e separa informação de mito no universo do bodybuilding.</p><a className="button button-outline" href="#videos">Conheça o quadro <Arrow /></a></div></section>

      <section id="sobre" className="about shell"><div><p className="section-kicker">Muito além dos memes</p><h2>O corpo é<br /><em>ciência.</em></h2></div><div className="about-copy"><p className="lead">Rodrigo Góes é nutricionista, atleta de fisiculturismo natural e criador de conteúdo.</p><p>Seu trabalho combina ciência, experiência prática e humor para falar sobre nutrição, bodybuilding e os riscos relacionados ao uso de esteroides. O resultado é um conteúdo que informa, provoca e faz milhões de pessoas prestarem atenção.</p><a className="text-link" href="#contato">Conheça minha história <Arrow /></a></div></section>

      <section className="library shell"><div className="section-heading"><div><p className="section-kicker">Aprenda com o Rodrigo</p><h2>Uma biblioteca<br /><em>sem bullshit.</em></h2></div><a className="text-link" href="#artigos">Explorar conteúdos <Arrow /></a></div><div className="topic-list">{topics.map(([n, title, desc]) => <a href="#artigos" className="topic" key={n}><span>{n}</span><strong>{title}</strong><p>{desc}</p><Arrow /></a>)}</div></section>

      <section id="artigos" className="articles shell"><p className="section-kicker">Do arquivo</p><h2>Conteúdo<br /><em>recente.</em></h2><div className="article-list">{articles.map((article, i) => <a href="#artigos" className="article" key={article}><span>0{i + 1}</span><strong>{article}</strong><small>LER ARTIGO <Arrow /></small></a>)}</div></section>

      <section id="contato" className="contact shell"><p className="section-kicker">Parcerias</p><h2>Sua marca quer<br />falar com <em>milhões?</em></h2><a className="button button-lime" href="mailto:contato@rodrigogoes.com">Fale comigo <Arrow /></a></section>

      <footer className="footer shell"><div><a className="brand" href="#top">RG<span>.</span></a><p>Natural. Ciência. Humor.</p></div><div className="footer-links"><a href="https://youtube.com">YouTube</a><a href="https://instagram.com">Instagram</a><a href="https://tiktok.com">TikTok</a><a href="https://x.com">X</a></div><div className="footer-meta"><a href="mailto:contato@rodrigogoes.com">Contato / Parcerias</a><p>© 2026 Rodrigo Góes</p></div></footer>
    </main>
  );
}
