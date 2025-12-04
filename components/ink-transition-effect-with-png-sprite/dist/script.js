const liquifyTrigger = document.querySelector('.js-liquify-trigger');
const textTriggers = [...document.querySelectorAll('p')];
const inkTriggers = [...document.querySelectorAll('.js-ink-trigger')];

const controller = new ScrollMagic.Controller();
 
const sceneAuthorLiquid = new ScrollMagic.Scene({
    triggerElement: liquifyTrigger,
    triggerHook: 'onEnter',
  })
  .setTween('#liquid', 2, {
    attr: {
      scale: '0'
    },
    ease: Power4.easeOut,
    delay: 1,
  })
  .reverse(false)
  .addTo(controller);

const sceneAuthorTransition = new ScrollMagic.Scene({
    triggerElement: liquifyTrigger,
    triggerHook: 'onEnter',
  })
  .setTween(liquifyTrigger, 3, {
    opacity: 1,
    y: 1,
    ease: Power4.easeOut,
    delay: 1,
  })
  .reverse(false)
  .addTo(controller);
 
textTriggers.map(text => {
  const isBelowScreen = (text.getBoundingClientRect().top > window.innerHeight) ? true : false;
  const dataDealy = (text.getAttribute('data-delay') === null || isBelowScreen) ? 0.5 : text.getAttribute('data-delay');
  const sceneText = new ScrollMagic.Scene({
    triggerElement: text,
    triggerHook: 'onEnter',
  })
  .setTween(text, 1.5, {
    y: 0,
    opacity: 1,
    ease: Power4.easeOut,
    delay: dataDealy,
  })
  .reverse(false)
  .addTo(controller);
});

inkTriggers.map(ink => {
  const sceneInk = new ScrollMagic.Scene({
    triggerElement: ink,
    triggerHook: 'onEnter',
  })
  .setClassToggle(ink, 'is-active')
  .reverse(false)
  .addTo(controller);
});