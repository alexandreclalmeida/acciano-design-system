export function getPortalContainer(): HTMLElement {
  const id = 'acciano-portal-root';
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    el.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:1000;';
    document.body.appendChild(el);
  }
  return el;
}
