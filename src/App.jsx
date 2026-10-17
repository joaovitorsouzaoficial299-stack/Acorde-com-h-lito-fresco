import React from 'react';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDown, ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronDown,
  CircleHelp, Clock3, Heart, Leaf, Menu, ShieldCheck, Sparkles, X,
  BookOpen, CalendarCheck, ClipboardCheck, Smartphone, Smile, Moon,
  Sun, LockKeyhole, BadgeCheck
} from 'lucide-react';

const questions = [
  {
    eyebrow: 'SEU OBJETIVO',
    title: 'O que você quer melhorar primeiro?',
    subtitle: 'Escolha uma opção e vamos direto ao ponto.',
    options: [
      { label: 'Cuidar melhor do hálito pela manhã', icon: Sun },
      { label: 'Ficar mais à vontade ao conversar de perto', icon: Smile },
      { label: 'Criar uma rotina bucal mais consistente', icon: ClipboardCheck }
    ]
  },
  {
    eyebrow: 'SUA ROTINA',
    title: 'Como costuma ser sua manhã?',
    subtitle: 'Sem julgamentos — é só para adaptar a orientação.',
    options: [
      { label: 'Já faço minha higiene bucal ao acordar', icon: CheckCircle2 },
      { label: 'Costumo estar com pressa', icon: Clock3 },
      { label: 'Quero organizar melhor meus cuidados', icon: Leaf }
    ]
  },
  {
    eyebrow: 'SEU GUIA',
    title: 'O que deixaria tudo mais fácil para você?',
    subtitle: 'Última pergunta. Leva só alguns segundos.',
    options: [
      { label: 'Um checklist simples', icon: ClipboardCheck },
      { label: 'Dicas curtas para o dia a dia', icon: Sun },
      { label: 'Um plano organizado para acompanhar por 30 dias', icon: CalendarCheck }
    ]
  }
];

const benefits = [
  { icon: BookOpen, title: 'E-book educativo', text: 'Orientações claras para entender e cuidar melhor da rotina bucal.' },
  { icon: ClipboardCheck, title: 'Checklist de rotina', text: 'Um guia simples para acompanhar os cuidados da manhã e da noite.' },
  { icon: CalendarCheck, title: 'Rastreador de 30 dias', text: 'Marque seus hábitos e observe sua consistência ao longo do mês.' },
  { icon: Smartphone, title: 'Guia de bolso', text: 'Consulte as orientações essenciais sempre que precisar.' }
];

function Brand({ light = false }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#top" aria-label="Acorde com Hálito Fresco, início">
    <span className="brand-mark"><Leaf size={22} strokeWidth={2.2} fill="currentColor" /></span>
    <span className="brand-name">acorde com <strong>hálito fresco</strong></span>
  </a>;
}

function Quiz({ onFinish, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const current = questions[step];
  const selected = answers[step];
  const progress = ((step + 1) / questions.length) * 100;
  const quizVisuals = [
    { image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85', alt: 'Mulher sorrindo com naturalidade', label: 'Mais tranquilidade nas conversas', note: 'Cuidados possíveis, sem julgamentos.' },
    { image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85', alt: 'Pessoas conversando em um ambiente descontraído', label: 'Cada rotina é diferente', note: 'Encontre hábitos que cabem no seu dia.' },
    { image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=85', alt: 'Cuidados pessoais em uma rotina de bem-estar', label: 'Pequenos passos contam', note: 'Organize sua rotina no seu ritmo.' }
  ];

  function next() {
    if (selected === undefined) return;
    if (step === questions.length - 1) onFinish(answers);
    else setStep(s => s + 1);
  }

  return <motion.div className="quiz-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="quiz-topbar">
      <Brand />
      <button className="icon-button" onClick={onClose} aria-label="Fechar quiz"><X size={20} /></button>
    </div>
    <div className="quiz-wrap">
      <div className="quiz-progress-copy"><span>SEU GUIA PERSONALIZADO</span><span>{step + 1} de {questions.length}</span></div>
      <div className="progress-track"><motion.div className="progress-fill" animate={{ width: `${progress}%` }} transition={{ duration: .35 }} /></div>
      <AnimatePresence mode="wait">
        <motion.div key={step} className="quiz-question" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .2 }}>
          <div className="quiz-visual">
            <img src={quizVisuals[step].image} alt={quizVisuals[step].alt} />
            <div className="quiz-visual-shade" />
            <div className="quiz-visual-copy"><span className="quiz-visual-mark"><Leaf size={17} /></span><strong>{quizVisuals[step].label}</strong><small>{quizVisuals[step].note}</small></div>
            <span className="quiz-visual-tag"><Leaf size={13} /> CUIDADO COM CARINHO</span>
          </div>
          <span className="eyebrow">{current.eyebrow}</span>
          <h1>{current.title}</h1>
          <p className="quiz-subtitle">{current.subtitle}</p>
          <div className="quiz-options">
            {current.options.map((option, i) => {
              const Icon = option.icon;
              return <button key={option.label} className={`quiz-option ${selected === i ? 'selected' : ''}`} onClick={() => setAnswers(prev => ({ ...prev, [step]: i }))}>
                <span className="option-icon"><Icon size={20} /></span>
                <span>{option.label}</span>
                <span className="option-check">{selected === i ? <Check size={17} /> : null}</span>
              </button>;
            })}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="quiz-controls">
        <button className="button button-ghost" onClick={() => step === 0 ? onClose() : setStep(s => s - 1)}><ArrowLeft size={17} /> Voltar</button>
        <button className="button button-primary" disabled={selected === undefined} onClick={next}>{step === questions.length - 1 ? 'Ver meu resultado' : 'Continuar'} <ArrowRight size={17} /></button>
      </div>
      <p className="privacy-note"><ShieldCheck size={14} /> Suas respostas servem apenas para orientar a experiência nesta página.</p>
    </div>
  </motion.div>;
}

function Result({ onOffer, answers }) {
  const chosen = answers[2];
  const headline = chosen === 1 ? 'Um plano simples pode ajudar você a manter o ritmo.' :
    chosen === 0 ? 'Vamos deixar sua rotina mais fácil de acompanhar.' :
    chosen === 2 ? 'Pequenos cuidados podem caber na sua manhã.' :
    'Um guia prático pode ajudar a organizar seus hábitos.';
  return <motion.section className="result-section section" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
    <div className="result-card">
      <div className="result-icon"><Sparkles size={27} /></div>
      <span className="eyebrow">SEU PRÓXIMO PASSO</span>
      <h2>{headline}</h2>
      <p>Suas respostas indicam que um material organizado e fácil de consultar pode combinar com o que você procura. O quiz não é um diagnóstico e não identifica causas de mau hálito.</p>
      <div className="result-points">
        <span><CheckCircle2 size={18} /> Rotina de manhã e à noite</span>
        <span><CheckCircle2 size={18} /> Checklist para acompanhar hábitos</span>
        <span><CheckCircle2 size={18} /> Plano educativo de 30 dias</span>
      </div>
      <button className="button button-primary button-wide" onClick={onOffer}>Conhecer o guia <ArrowRight size={18} /></button>
    </div>
  </motion.section>;
}

function Offer({ onCheckout }) {
  return <motion.section className="offer-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div className="offer-nav"><Brand /><span className="secure-label"><ShieldCheck size={15} /> Conteúdo digital educativo</span></div>
    <section className="offer-hero">
      <div className="offer-copy">
        <span className="eyebrow"><Sparkles size={14} /> SEU PLANO DE CUIDADOS</span>
        <h1>Uma rotina mais consciente começa com <em>pequenos hábitos.</em></h1>
        <p>Conheça o Acorde com Hálito Fresco: um guia educativo para organizar seus cuidados bucais, com checklists e um plano de acompanhamento de 30 dias.</p>
        <div className="offer-price-row"><div><span className="price-caption">PACOTE DIGITAL COMPLETO</span><div className="price">R$ 29,90</div></div><span className="one-time">Pagamento único<br />a configurar</span></div>
        <button className="button button-primary button-wide" onClick={onCheckout}>Quero conhecer o pacote <ArrowRight size={18} /></button>
        <div className="safe-note"><LockKeyhole size={14} /> O checkout seguro será conectado na próxima etapa.</div>
      </div>
      <div className="product-scene" aria-label="Representação ilustrativa dos materiais digitais">
        <div className="scene-glow" />
        <div className="book-mockup">
          <div className="book-top"><span>GUIA EDUCATIVO</span><Leaf size={23} /></div>
          <div className="book-title">ACORDE COM<br /><strong>HÁLITO FRESCO</strong></div>
          <div className="book-line" />
          <div className="book-subtitle">30 dias de hábitos<br />para uma rotina bucal</div>
          <div className="book-illustration"><Sun size={35} /><span className="illustration-leaf"><Leaf size={44} /></span></div>
          <div className="book-footer">GUIA • CHECKLIST • ROTINA</div>
        </div>
        <div className="floating-bonus bonus-one"><span className="bonus-symbol"><ClipboardCheck size={20} /></span><span><strong>Checklist</strong><small>Manhã e noite</small></span></div>
        <div className="floating-bonus bonus-two"><span className="bonus-symbol"><CalendarCheck size={20} /></span><span><strong>Rastreador</strong><small>30 dias</small></span></div>
      </div>
    </section>
    <section className="included-section section">
      <div className="section-heading"><span className="eyebrow">O QUE VOCÊ RECEBE</span><h2>Materiais práticos para acompanhar sua rotina</h2><p>Quatro recursos digitais para consultar e colocar seus hábitos em prática.</p></div>
      <div className="benefit-grid">{benefits.map(({ icon: Icon, title, text }, i) => <article className="benefit-card" key={title}><div className="benefit-icon"><Icon size={23} /></div><span className="benefit-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className="routine-band"><div><span className="eyebrow">SEU RITMO, SEU PROGRESSO</span><h2>Mais organização.<br /><em>Menos complicação.</em></h2></div><p>Use os materiais como apoio para construir uma rotina consistente. Acompanhe seus hábitos sem pressão e adapte as orientações à sua realidade.</p></section>
    <section className="faq-section section"><div className="section-heading"><span className="eyebrow">DÚVIDAS FREQUENTES</span><h2>Antes de começar</h2></div><Faq /></section>
    <section className="final-cta"><span className="eyebrow">ACORDE COM HÁLITO FRESCO</span><h2>Comece organizando os pequenos hábitos.</h2><p>Um pacote digital educativo para acompanhar sua rotina bucal por 30 dias.</p><div className="final-price">R$ 29,90</div><button className="button button-light" onClick={onCheckout}>Quero acessar o pacote <ArrowRight size={18} /></button></section>
    <footer className="footer offer-footer"><Brand light /><p>Material educativo. Não substitui avaliação ou orientação de um cirurgião-dentista. Não há promessa de eliminação do mau hálito em prazo determinado.</p><span>© {new Date().getFullYear()} Acorde com Hálito Fresco</span></footer>
  </motion.section>;
}

function Faq() {
  const [open, setOpen] = useState(0);
  const items = [
    ['O que vem no pacote?', 'Você recebe um e-book educativo, um checklist de rotina bucal, um rastreador de hábitos por 30 dias e um guia de bolso.'],
    ['O material promete acabar com o mau hálito?', 'Não. O conteúdo ajuda a organizar hábitos de higiene bucal, mas não garante eliminar o mau hálito. A causa pode variar de pessoa para pessoa.'],
    ['Posso usar no celular?', 'Sim. Os materiais digitais podem ser consultados no celular, tablet ou computador.'],
    ['E se o mau hálito persistir?', 'Procure um cirurgião-dentista para avaliação. O material não substitui atendimento profissional.']
  ];
  return <div className="faq-list">{items.map(([q, a], i) => <div className={`faq-item ${open === i ? 'faq-open' : ''}`} key={q}><button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span>{q}</span><ChevronDown size={19} /></button><AnimatePresence>{open === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{a}</motion.p>}</AnimatePresence></div>)}</div>;
}

export default function App() {
  const [view, setView] = useState('quiz');
  const [answers, setAnswers] = useState({});
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const completedAnswers = useMemo(() => Object.keys(answers).length, [answers]);

  function startQuiz() {
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function finishQuiz(data) {
    setAnswers(data);
    setView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function showOffer() {
    setView('offer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return <div id="top" className="app-shell">
    <AnimatePresence mode="wait">
      {view === 'quiz' ? <Quiz key="quiz" onFinish={finishQuiz} onClose={() => setView('landing')} /> :
       view === 'result' ? <div key="result"><header className="site-header"><Brand /><button className="text-button" onClick={() => setView('landing')}>Voltar ao início</button></header><Result answers={answers} onOffer={showOffer} /></div> :
       view === 'offer' ? <Offer key="offer" onCheckout={() => setCheckoutModal(true)} /> :
       <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <header className="site-header">
          <Brand />
          <nav className={mobileMenu ? 'nav-open' : ''}><a href="#como-funciona" onClick={() => setMobileMenu(false)}>Como funciona</a><a href="#conteudo" onClick={() => setMobileMenu(false)}>O que você vai aprender</a><button className="button button-small button-primary" onClick={startQuiz}>Fazer o quiz <ArrowRight size={15} /></button></nav>
          <button className="mobile-menu-button" onClick={() => setMobileMenu(v => !v)} aria-label="Abrir menu">{mobileMenu ? <X /> : <Menu />}</button>
        </header>
        <main>
          <section className="hero">
            <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
            <div className="hero-content">
              <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
                <div className="eyebrow-pill"><span className="status-dot" /> QUIZ GRATUITO • CERCA DE 1 MINUTO</div>
                <h1>Cuide melhor do seu hálito, <em>começando hoje.</em></h1>
                <p>Responda a 3 perguntas rápidas e veja por onde começar. Simples, direto e sem complicação.</p>
                <div className="hero-actions"><button className="button button-primary button-large" onClick={startQuiz}>Começar quiz grátis <ArrowRight size={18} /></button><span className="micro-trust"><ShieldCheck size={15} /> 3 perguntas · Grátis · Rápido</span></div>
                <div className="hero-social-proof"><div className="avatar-stack"><span>☀</span><span>✓</span><span>✦</span></div><span>Comece com pequenos passos, um dia de cada vez.</span></div>
              </motion.div>
              <motion.div className="hero-visual" initial={{ opacity: 0, scale: .96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .65, delay: .12 }}>
                <div className="visual-backdrop" />
                <div className="sun-disc"><Sun size={46} strokeWidth={1.25} /></div>
                <div className="morning-card">
                  <div className="morning-card-top"><span className="mini-brand"><Leaf size={16} /> SUA ROTINA, COM CALMA</span><span className="live-dot" /></div>
                  <div className="morning-title">Um novo dia.<br /><em>Um hábito de cada vez.</em></div>
                  <div className="routine-list">
                    <div><span className="routine-check"><Check size={14} /></span><span>Higiene bucal</span><small>Manhã</small></div>
                    <div><span className="routine-check"><Check size={14} /></span><span>Água ao acordar</span><small>Hábito</small></div>
                    <div><span className="routine-check empty" /><span>Organizar a noite</span><small>Rotina</small></div>
                  </div>
                  <div className="routine-progress"><span /><span /><span /><span /><span /><span /><span /></div>
                  <div className="routine-foot"><span>SEU PLANO PESSOAL</span><span>01 / 30</span></div>
                </div>
                <div className="floating-note note-top"><span className="note-icon"><Heart size={17} /></span><span><strong>Sem pressão</strong><small>no seu ritmo</small></span></div>
                <div className="floating-note note-bottom"><span className="note-icon green"><Sparkles size={17} /></span><span><strong>Passos práticos</strong><small>para o dia a dia</small></span></div>
              </motion.div>
            </div>
            <a className="scroll-cue" href="#como-funciona"><span>CONHEÇA A EXPERIÊNCIA</span><ArrowDown size={15} /></a>
          </section>
          <section className="trust-strip"><div><ShieldCheck size={18} /><span>Conteúdo educativo</span></div><div><Clock3 size={18} /><span>Quiz rápido</span></div><div><Smartphone size={18} /><span>Feito para celular</span></div><div><Heart size={18} /><span>Sem julgamentos</span></div></section>
          <section id="como-funciona" className="section how-section">
            <div className="section-heading"><span className="eyebrow">SIMPLES ASSIM</span><h2>Encontre um caminho que combine com <em>sua rotina.</em></h2><p>Sem fórmulas mágicas. Só uma forma mais organizada de entender e acompanhar seus hábitos.</p></div>
            <div className="steps-grid">
              <article className="step-card"><span className="step-number">01</span><div className="step-icon"><CircleHelp size={23} /></div><h3>Responda ao quiz</h3><p>Conte o que você busca e como costuma ser sua rotina.</p></article>
              <article className="step-card"><span className="step-number">02</span><div className="step-icon"><Sparkles size={23} /></div><h3>Veja seu próximo passo</h3><p>Receba uma orientação educativa de acordo com suas preferências.</p></article>
              <article className="step-card"><span className="step-number">03</span><div className="step-icon"><CalendarCheck size={23} /></div><h3>Organize seus hábitos</h3><p>Conheça o guia com checklists e acompanhamento por 30 dias.</p></article>
            </div>
            <div className="center-action"><button className="button button-primary button-large" onClick={startQuiz}>Começar meu quiz <ArrowRight size={18} /></button></div>
          </section>
          <section id="conteudo" className="content-section">
            <div className="content-copy"><span className="eyebrow">UM GUIA PARA O DIA A DIA</span><h2>Informação clara. Hábitos possíveis. <em>Mais organização.</em></h2><p>O Acorde com Hálito Fresco é um material educativo para ajudar você a entender os cuidados bucais e criar uma rotina mais consistente, sem promessas milagrosas.</p><ul><li><CheckCircle2 size={18} /> Orientações para manhã e noite</li><li><CheckCircle2 size={18} /> Checklist para acompanhar os cuidados</li><li><CheckCircle2 size={18} /> Rastreador de hábitos por 30 dias</li></ul><button className="button button-primary" onClick={showOffer}>Conhecer o material <ArrowRight size={17} /></button></div>
            <div className="content-visual"><div className="content-card card-main"><div className="content-card-label"><Leaf size={17} /> ACORDE COM HÁLITO FRESCO</div><h3>Seu guia de<br /><em>30 dias</em></h3><div className="content-card-lines"><span /><span /><span /></div><div className="content-card-sun"><Sun size={36} /></div></div><div className="content-card card-check"><div className="check-head"><ClipboardCheck size={20} /><span>CHECKLIST</span></div><p>Minha rotina da manhã</p><div className="check-row"><i /><span>Escovar os dentes</span></div><div className="check-row"><i /><span>Higiene da língua com cuidado</span></div><div className="check-row"><i /><span>Beber água</span></div></div><div className="content-sparkle sparkle-a">✳</div><div className="content-sparkle sparkle-b">✦</div></div>
          </section>
          <section className="soft-cta"><div className="soft-cta-icon"><Sun size={26} /></div><div><h2>Comece com uma pergunta simples.</h2><p>Leva cerca de um minuto para explorar seus próximos passos.</p></div><button className="button button-primary" onClick={startQuiz}>Fazer o quiz <ArrowRight size={17} /></button></section>
        </main>
        <footer className="footer"><Brand /><p>Conteúdo educativo sobre hábitos de higiene bucal. Não substitui avaliação odontológica.</p><span>© {new Date().getFullYear()} Acorde com Hálito Fresco</span></footer>
       </motion.div>}
    </AnimatePresence>
    <AnimatePresence>{checkoutModal && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCheckoutModal(false)}><motion.div className="checkout-modal" initial={{ opacity: 0, y: 16, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setCheckoutModal(false)} aria-label="Fechar"><X size={19} /></button><div className="modal-icon"><LockKeyhole size={24} /></div><span className="eyebrow">PRÓXIMA ETAPA</span><h2>Vamos preparar seu acesso.</h2><p>A página de oferta já está pronta. Para receber pagamentos e liberar os arquivos automaticamente, precisamos conectar um checkout real.</p><div className="modal-price"><span>Pacote digital</span><strong>R$ 29,90</strong></div><button className="button button-primary button-wide" onClick={() => setCheckoutModal(false)}>Entendi <Check size={17} /></button><small>Nenhuma cobrança será feita nesta versão de demonstração.</small></motion.div></motion.div>}</AnimatePresence>
  </div>;
}