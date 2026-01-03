const whatsappNumber = '5521999999999';
const whatsappMessage = 'Quero garantir o Simulado ACE por R$ 69,90! Pode me enviar a chave PIX?';
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

const yearSpan = document.getElementById('ano');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
whatsappButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    window.open(whatsappLink, '_blank', 'noopener');
  });
});

const scrollButtons = document.querySelectorAll('[data-scroll]');
scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetSelector = button.getAttribute('data-scroll');
    const target = targetSelector ? document.querySelector(targetSelector) : null;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const sampleQuestionHtml = `
  <div class="text-left space-y-4">
    <p class="text-xs uppercase tracking-[0.4em] text-cyan-300">Bloco Saquarema</p>
    <h4 class="text-lg font-semibold text-white">As marés da Lagoa de Saquarema influenciam diretamente quais atividades de vigilância ambiental?</h4>
    <ul class="space-y-2 text-sm text-slate-200">
      <li>A) Monitoramento de criadouros em áreas alagadas.</li>
      <li>B) Aplicação de UBV pesado em zonas secas.</li>
      <li>C) Distribuição de EPI para agentes administrativos.</li>
      <li>D) Somente ações educativas nas escolas.</li>
    </ul>
    <div class="rounded-2xl border border-emerald-400/50 bg-emerald-400/10 p-3 text-sm text-emerald-100">
      Gabarito: alternativa A. A lagoa concentra criadouros nos bairros às margens e exige visitas regulares após as marés.
    </div>
  </div>
`;

const alertButton = document.getElementById('btn-alert');
if (alertButton) {
  alertButton.addEventListener('click', () => {
    Swal.fire({
      title: 'Questão do simulador',
      html: sampleQuestionHtml,
      background: '#020617',
      color: '#e2e8f0',
      confirmButtonText: 'Quero treinar',
      confirmButtonColor: '#22d3ee',
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(whatsappLink, '_blank', 'noopener');
      }
    });
  });
}

const galleryButton = document.getElementById('btn-galeria');
if (galleryButton) {
  galleryButton.addEventListener('click', () => {
    Swal.fire({
      title: 'Telas do Simulado',
      html: `
        <div class="space-y-4">
          <img src="assets/dashboard.png" alt="Dashboard do simulador" class="rounded-2xl border border-white/10">
          <img src="assets/login.png" alt="Tela de login" class="rounded-2xl border border-white/10">
          <img src="assets/perguntas.png" alt="Tela de perguntas" class="rounded-2xl border border-white/10">
        </div>
      `,
      width: 700,
      background: '#020617',
      color: '#e2e8f0',
      showCloseButton: true,
      focusConfirm: false,
    });
  });
}

const testimonialMarquee = document.querySelector('[data-testimonial-marquee]');
const testimonialTrack = document.querySelector('[data-testimonial-track]');
if (testimonialMarquee && testimonialTrack) {
  const slides = Array.from(testimonialTrack.children);
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    testimonialTrack.appendChild(clone);
  });

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let baseSpeed = motionQuery.matches ? 0 : 0.4;
  motionQuery.addEventListener('change', (event) => {
    baseSpeed = event.matches ? 0 : 0.4;
  });

  let offset = 0;
  let isDragging = false;
  let pointerStartX = 0;
  let offsetOnDragStart = 0;

  const getLoopWidth = () => testimonialTrack.scrollWidth / 2 || 1;

  const clampOffset = () => {
    const loopWidth = getLoopWidth();
    while (offset <= -loopWidth) {
      offset += loopWidth;
    }
    while (offset > 0) {
      offset -= loopWidth;
    }
  };

  const applyTransform = () => {
    testimonialTrack.style.transform = `translateX(${offset}px)`;
  };

  const animate = () => {
    if (!isDragging) {
      offset -= baseSpeed;
      clampOffset();
      applyTransform();
    }
    requestAnimationFrame(animate);
  };

  applyTransform();
  requestAnimationFrame(animate);

  testimonialMarquee.addEventListener('pointerdown', (event) => {
    isDragging = true;
    pointerStartX = event.clientX;
    offsetOnDragStart = offset;
    testimonialMarquee.setPointerCapture?.(event.pointerId);
    testimonialMarquee.classList.add('is-dragging');
  });

  testimonialMarquee.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - pointerStartX;
    offset = offsetOnDragStart + deltaX;
    applyTransform();
  });

  const endDrag = (event) => {
    if (!isDragging) return;
    isDragging = false;
    testimonialMarquee.classList.remove('is-dragging');
    if (event.pointerId && testimonialMarquee.hasPointerCapture?.(event.pointerId)) {
      testimonialMarquee.releasePointerCapture(event.pointerId);
    }
    clampOffset();
    applyTransform();
  };

  testimonialMarquee.addEventListener('pointerup', endDrag);
  testimonialMarquee.addEventListener('pointerleave', endDrag);
  testimonialMarquee.addEventListener('pointercancel', endDrag);
}
