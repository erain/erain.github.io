'use strict';

// NexT's mobile controls are divs; expose the same actions to keyboard users.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.copy-btn').forEach(button => {
    button.setAttribute('role', 'button');
    button.setAttribute('aria-label', '复制代码');
    button.title = '复制代码';
  });
  const tabs = [...document.querySelectorAll('.sidebar-nav li')];
  tabs.forEach(tab => tab.setAttribute('role', 'button'));
  document.querySelectorAll('[role="button"]').forEach(control => {
    if (!control.children.length && !control.textContent.trim()) {
      control.tabIndex = -1;
      control.setAttribute('aria-hidden', 'true');
      return;
    }
    if (!control.hasAttribute('tabindex')) control.tabIndex = 0;
    control.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        control.click();
      }
    });
  });
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const update = () => {
      const visible = backToTop.classList.contains('back-to-top-on');
      backToTop.tabIndex = visible ? 0 : -1;
      backToTop.setAttribute('aria-hidden', String(!visible));
    };
    update();
    new MutationObserver(update).observe(backToTop, { attributes: true, attributeFilter: ['class'] });
  }
  const menu = document.querySelector('.site-nav-toggle .toggle');
  if (menu) {
    const update = () => menu.setAttribute('aria-expanded', String(document.body.classList.contains('site-nav-on')));
    update();
    new MutationObserver(update).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }
});
