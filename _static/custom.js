/* Set --sch-sticky-top to the bottom of the last sticky header bar so that
   the schedule table's sticky thead doesn't slide under it. */
function updateSchStickyTop() {
    const bar = document.querySelector('.header-article-items');
    const top = bar ? bar.getBoundingClientRect().bottom : 0;
    document.documentElement.style.setProperty('--sch-sticky-top', top + 'px');
}
document.addEventListener('DOMContentLoaded', updateSchStickyTop);
window.addEventListener('resize', updateSchStickyTop);

/* Highlight today's row in the embedded course schedule table. */
document.addEventListener('DOMContentLoaded', function () {
  var d = new Date();
  var today = (d.getMonth() + 1) + '/' + d.getDate();
  document.querySelectorAll('tr[data-date="' + today + '"]').forEach(function (tr) {
    tr.classList.add('sch-today');
  });
});

/* Keyboard navigation: left/right arrow keys navigate prev/next pages. */
document.addEventListener('keydown', function (e) {
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
  var tag = document.activeElement && document.activeElement.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if (document.activeElement && document.activeElement.isContentEditable) return;
  if (e.key === 'ArrowLeft') {
    var prev = document.querySelector('a.left-prev');
    if (prev) { window.location.href = prev.href; }
  } else if (e.key === 'ArrowRight') {
    var next = document.querySelector('a.right-next');
    if (next) { window.location.href = next.href; }
  }
});

/* ADA fix: sphinx-design tab-sets render as grouped radio inputs without a
   fieldset, which WAVE flags as "Missing fieldset". Wrap each tab-set in a
   fieldset with a visually-hidden legend so the radio group is properly
   enclosed for assistive tech and static accessibility checkers. */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.sd-tab-set').forEach(function (tabSet) {
    if (tabSet.parentElement && tabSet.parentElement.classList.contains('sd-tab-fieldset')) {
      return;
    }
    var labels = tabSet.querySelectorAll(':scope > .sd-tab-label');
    var labelText = Array.from(labels).map(function (l) {
      return l.textContent.trim();
    }).filter(Boolean).join(', ');
    var fieldset = document.createElement('fieldset');
    fieldset.className = 'sd-tab-fieldset';
    var legend = document.createElement('legend');
    legend.className = 'visually-hidden';
    legend.textContent = labelText ? 'Tab set: ' + labelText : 'Tab set';
    fieldset.appendChild(legend);
    tabSet.parentNode.insertBefore(fieldset, tabSet);
    fieldset.appendChild(tabSet);
  });
});

/* Make sample output admonitions and scrollable tables focusable for keyboard users. */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.admonition.sample-output')
    .forEach(el => el.setAttribute('tabindex', '0'));
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.pst-scrollable-table-container')
    .forEach(el => el.setAttribute('tabindex', '0'));
});

/* Add accessible title to YouTube iframes that the sphinxcontrib-youtube extension
   does not emit, satisfying the frame-title axe rule.
   Track: https://github.com/Purdue-ENGR-13300/content/issues/1088 */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.video_wrapper iframe[src*="youtube"]')
    .forEach(function (el) {
      if (!el.title) {
        el.setAttribute('title', 'YouTube video player');
      }
    });
});
