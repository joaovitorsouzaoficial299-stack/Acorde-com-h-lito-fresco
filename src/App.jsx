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
  { eyebrow: 'SEU OBJETIVO', title: 'O que você mais quer melhorar?', subtitle: 'Escolha o que faria mais diferença no seu dia a dia.', options: [
    { label: 'Acordar mais confiante com meu hálito', icon: Sun },
    { label: 'Ficar mais à vontade em conversas de perto', icon: Smile },
    { label: 'Ter uma rotina de cuidados mais organizada', icon: ClipboardCheck }
  ]},
  { eyebrow: 'QUANDO ACONTECE', title: 'Em qual momento isso mais preocupa você?', subtitle: 'Não existe resposta certa — queremos entender sua preocupação.', options: [
    { label: 'Principalmente quando acordo', icon: Sun },
    { label: 'Ao longo do dia', icon: Clock3 },
    { label: 'Antes de conversar de perto com alguém', icon: Heart }
  ]},
  { eyebrow: 'SUA MANHÃ', title: 'Como costuma ser sua rotina ao acordar?', subtitle: 'Pense no que você realmente consegue fazer hoje.', options: [
    { label: 'Tenho tempo para cuidar de mim com calma', icon: CheckCircle2 },
    { label: 'Faço tudo correndo', icon: Clock3 },
    { label: 'Ainda não tenho uma rotina definida', icon: ClipboardCheck }
  ]},
  { eyebrow: 'HÁBITOS ATUAIS', title: 'Quais cuidados já fazem parte da sua rotina?', subtitle: 'Marque a opção que mais se aproxima do seu dia a dia.', options: [
    { label: 'Escovo os dentes e uso fio dental regularmente', icon: CheckCircle2 },
    { label: 'Escovo os dentes, mas nem sempre mantenho os outros cuidados', icon: Smile },
    { label: 'Quero entender melhor quais hábitos incluir', icon: BookOpen }
  ]},
  { eyebrow: 'O QUE ATRAPALHA', title: 'O que mais dificulta manter esses cuidados?', subtitle: 'A ideia é encontrar uma forma prática de se organizar.', options: [
    { label: 'Falta de tempo ou pressa', icon: Clock3 },
    { label: 'Esqueço ou não consigo manter a constância', icon: CalendarCheck },
    { label: 'Tenho dúvidas sobre como organizar os cuidados', icon: CircleHelp }
  ]},
  { eyebrow: 'O QUE VOCÊ PROCURA', title: 'Que tipo de ajuda seria mais útil para você?', subtitle: 'Escolha o formato que usaria de verdade.', options: [
    { label: 'Uma lista simples para consultar todo dia', icon: ClipboardCheck },
    { label: 'Explicações curtas e fáceis de entender', icon: BookOpen },
    { label: 'Um plano para acompanhar meus hábitos por 30 dias', icon: CalendarCheck }
  ]},
  { eyebrow: 'SEU GUIA', title: 'Como você prefere acompanhar sua rotina?', subtitle: 'Só mais uma escolha para concluir e conhecer o material.', options: [
    { label: 'No celular, sempre que precisar', icon: Smartphone },
    { label: 'Com um checklist para marcar o que fiz', icon: CheckCircle2 },
    { label: 'Com um plano organizado por etapas', icon: CalendarCheck }
  ]}
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

function Quiz({ onFinish }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const current = questions[step];
  const selected = answers[step];
  const progress = ((step + 1) / questions.length) * 100;
  const quizVisuals = [
    { image: 'https://images.unsplash.com/photo-1527167484260-43ca4f1cc204?auto=format&fit=crop&w=900&q=85', alt: 'Homem preocupado e cobrindo a boca ao pensar no hálito', label: 'Insegurança com o hálito?', note: 'Você não precisa lidar com isso sozinho.' },
    { image: 'https://images.unsplash.com/photo-1530210138768-d5ee88d3b482?auto=format&fit=crop&w=900&q=85', alt: 'Mulher cobrindo a boca em um momento de preocupação com o hálito', label: 'É comum ficar preocupado', note: 'Entenda hábitos que podem ajudar na rotina.' },
    { image: 'https://images.unsplash.com/photo-1693692282136-2eeb24c11856?auto=format&fit=crop&w=900&q=85', alt: 'Mulher escovando os dentes no banheiro', label: 'Cuidados bucais no dia a dia', note: 'Organize uma rotina simples e consistente.' }
  ];

  function next() {
    if (selected === undefined) return;
    if (step === questions.length - 1) onFinish(answers);
    else setStep(s => s + 1);
  }

  return <motion.div className="quiz-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="quiz-topbar">
      <Brand />
    </div>
    <div className="quiz-wrap">
      <div className="quiz-progress-copy"><span>SEU GUIA PERSONALIZADO</span><span>{step + 1} de {questions.length}</span></div>
      <div className="progress-track"><motion.div className="progress-fill" animate={{ width: `${progress}%` }} transition={{ duration: .35 }} /></div>
      <AnimatePresence mode="wait">
        <motion.div key={step} className="quiz-question" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .2 }}>
          <div className="quiz-visual">
            <img src={quizVisuals[step % quizVisuals.length].image} alt={quizVisuals[step % quizVisuals.length].alt} />
            <div className="quiz-visual-shade" />
            <div className="quiz-visual-copy"><span className="quiz-visual-mark"><Leaf size={17} /></span><strong>{quizVisuals[step % quizVisuals.length].label}</strong><small>{quizVisuals[step % quizVisuals.length].note}</small></div>
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
        <button className="button button-ghost" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}><ArrowLeft size={17} /> Voltar</button>
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
    <div className="offer-nav"><Brand /><span className="secure-label"><ShieldCheck size={15} /> Guia educativo</span></div>
    <section className="offer-hero">
      <div className="offer-copy">
        <span className="eyebrow">SEU GUIA PRÁTICO</span>
        <h1>Cuide da sua rotina bucal com <em>mais simplicidade.</em></h1>
        <p>Um material educativo para ajudar você a organizar os cuidados da manhã e da noite, sem complicação e no seu ritmo.</p>
        <div className="offer-price-row"><div><span className="price-caption">ACESSO AO PACOTE DIGITAL</span><div className="price">R$ 29,90</div></div><span className="one-time">Pagamento único<br />checkout em configuração</span></div>
        <button className="button button-primary button-wide" onClick={onCheckout}>Quero conhecer o guia <ArrowRight size={18} /></button>
        <div className="safe-note">Conteúdo educativo; não substitui avaliação odontológica.</div>
      </div>
      <div className="product-scene" aria-label="Capa ilustrativa do guia digital">
        <div className="scene-glow" />
        <div className="book-mockup">
          <div className="book-top"><span>GUIA EDUCATIVO</span><Leaf size={23} /></div>
          <div className="book-title">ACORDE COM<br /><strong>HÁLITO FRESCO</strong></div>
          <div className="book-line" />
          <div className="book-subtitle">Hábitos simples<br />para sua rotina bucal</div>
          <div className="book-illustration"><Sun size={35} /><span className="illustration-leaf"><Leaf size={44} /></span></div>
          <div className="book-footer">GUIA • CHECKLIST • 30 DIAS</div>
        </div>
      </div>
    </section>
    <section className="included-section section compact-included">
      <div className="section-heading"><span className="eyebrow">O QUE ESTÁ INCLUÍDO</span><h2>O essencial para se organizar</h2></div>
      <div className="benefit-grid">
        <article className="benefit-card"><div className="benefit-icon"><BookOpen size={22} /></div><h3>Guia educativo</h3><p>Orientações simples sobre cuidados bucais.</p></article>
        <article className="benefit-card"><div className="benefit-icon"><ClipboardCheck size={22} /></div><h3>Checklist diário</h3><p>Um lembrete para manhã e noite.</p></article>
        <article className="benefit-card"><div className="benefit-icon"><CalendarCheck size={22} /></div><h3>Plano de 30 dias</h3><p>Acompanhe a consistência dos seus hábitos.</p></article>
      </div>
    </section>
    <footer className="footer offer-footer"><Brand light /><p>Material educativo. Não promete eliminar o mau hálito e não substitui avaliação de um cirurgião-dentista.</p><span>© {new Date().getFullYear()} Acorde com Hálito Fresco</span></footer>
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
  function finishQuiz(data) {
    setAnswers(data);
    setView('offer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return <div id="top" className="app-shell">
    <AnimatePresence mode="wait">
      {view === 'quiz' ? <Quiz key="quiz" onFinish={finishQuiz} /> :
       <Offer key="offer" onCheckout={() => setCheckoutModal(true)} />}
    </AnimatePresence>
    <AnimatePresence>{checkoutModal && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCheckoutModal(false)}><motion.div className="checkout-modal" initial={{ opacity: 0, y: 16, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setCheckoutModal(false)} aria-label="Fechar"><X size={19} /></button><div className="modal-icon"><LockKeyhole size={24} /></div><span className="eyebrow">PRÓXIMA ETAPA</span><h2>Vamos preparar seu acesso.</h2><p>A página de oferta já está pronta. Para receber pagamentos e liberar os arquivos automaticamente, precisamos conectar um checkout real.</p><div className="modal-price"><span>Pacote digital</span><strong>R$ 29,90</strong></div><button className="button button-primary button-wide" onClick={() => setCheckoutModal(false)}>Entendi <Check size={17} /></button><small>Nenhuma cobrança será feita nesta versão de demonstração.</small></motion.div></motion.div>}</AnimatePresence>
  </div>;
}