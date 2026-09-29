/**
 * Home Assistant - Weather Forecast French Translator
 * 
 * Automatically translates Home Assistant weather-forecast cards to French
 * even when the host browser, OS, or wall tablet is locked to English.
 * 
 * Repository: https://github.com/Blackbol/ha-weather-translate
 * License: MIT
 */

(function () {
  'use strict';

  const DAY_MAP = {
    'mon': 'lun.',
    'tue': 'mar.',
    'wed': 'mer.',
    'thu': 'jeu.',
    'fri': 'ven.',
    'sat': 'sam.',
    'sun': 'dim.',
    'monday': 'Lundi',
    'tuesday': 'Mardi',
    'wednesday': 'Mercredi',
    'thursday': 'Jeudi',
    'friday': 'Vendredi',
    'saturday': 'Samedi',
    'sunday': 'Dimanche',
    'today': "Aujourd'hui",
    'tomorrow': 'Demain',
    'daily': 'Quotidien',
    'hourly': 'Horaire'
  };

  const STATE_MAP = {
    'clear-night': 'Nuit claire',
    'clear, night': 'Nuit claire',
    'sunny': 'Ensoleillé',
    'partly cloudy': 'Partiellement nuageux',
    'partlycloudy': 'Partiellement nuageux',
    'cloudy': 'Nuageux',
    'overcast': 'Couvert',
    'rainy': 'Pluvieux',
    'pouring': 'Fortes pluies',
    'lightning': 'Orageux',
    'lightning-rainy': 'Orageux et pluvieux',
    'thunderstorm': 'Orageux',
    'fog': 'Brouillard',
    'mist': 'Brume',
    'haze': 'Brume sèche',
    'windy': 'Venteux',
    'windy-variant': 'Venteux',
    'snowy': 'Neigeux',
    'snowy-rainy': 'Pluie et neige mêlées',
    'hail': 'Grêle',
    'exceptional': 'Exceptionnel'
  };

  const translateDOM = (root) => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
      const val = node.nodeValue;
      if (!val || !val.trim()) continue;
      const trimmed = val.trim();
      const lower = trimmed.toLowerCase();

      // Check day abbreviations (e.g., "mon" or "mon.")
      const cleanDay = lower.replace(/\.$/, '');
      if (DAY_MAP[cleanDay]) {
        node.nodeValue = val.replace(trimmed, DAY_MAP[cleanDay]);
        continue;
      }

      // Check exact weather condition states
      if (STATE_MAP[lower]) {
        node.nodeValue = val.replace(trimmed, STATE_MAP[lower]);
        continue;
      }

      // Substring weather translation (case-insensitive)
      for (const en in STATE_MAP) {
        if (lower.indexOf(en) !== -1) {
          const reg = new RegExp(en, 'gi');
          node.nodeValue = node.nodeValue.replace(reg, STATE_MAP[en]);
        }
      }
    }
  };

  const observedRoots = new WeakSet();

  const scanAndObserve = () => {
    const visited = new Set();
    const deepScan = (node) => {
      if (!node || visited.has(node)) return;
      visited.add(node);

      if (node.nodeType === 1) { // ELEMENT_NODE
        const tag = (node.tagName || '').toLowerCase();
        const isWeather =
          tag === 'hui-weather-forecast-card' ||
          (tag === 'ha-card' && (
            node.classList.contains('type-weather-forecast') ||
            (node.querySelector && (node.querySelector('.forecast') || node.querySelector('.weather-icon')))
          )) ||
          (node.getAttribute && (
            node.getAttribute('type') === 'weather-forecast' ||
            node.getAttribute('card-type') === 'weather-forecast'
          ));

        if (isWeather) {
          translateDOM(node);
          if (node.shadowRoot) {
            translateDOM(node.shadowRoot);
            if (!observedRoots.has(node.shadowRoot)) {
              observedRoots.add(node.shadowRoot);
              const obs = new MutationObserver(() => {
                obs.disconnect();
                try {
                  translateDOM(node.shadowRoot);
                } finally {
                  obs.observe(node.shadowRoot, { childList: true, subtree: true, characterData: true });
                }
              });
              obs.observe(node.shadowRoot, { childList: true, subtree: true, characterData: true });
            }
          }
        }

        if (node.shadowRoot) {
          deepScan(node.shadowRoot);
        }
      }

      let child = node.firstChild;
      while (child) {
        deepScan(child);
        child = child.nextSibling;
      }
    };

    deepScan(document.body || document.documentElement);
  };

  // Run immediately or on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanAndObserve);
  } else {
    scanAndObserve();
  }

  // Periodic rescan to catch view switching and state updates
  setInterval(scanAndObserve, 2000);

  // Global observer for dynamic dashboard additions
  try {
    const globalObserver = new MutationObserver(() => {
      scanAndObserve();
    });
    globalObserver.observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {}

  // Register in customCards for Lovelace / HACS identification
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'weather-translate',
    name: 'Weather Translate (French)',
    description: 'Auto-translates Home Assistant weather cards to French on English browsers and tablets'
  });

  console.info(
    '%c HA-WEATHER-TRANSLATE %c v1.0.0 Loaded ',
    'color: white; background: #0288D1; font-weight: 700; border-radius: 3px 0 0 3px;',
    'color: #0288D1; background: #E1F5FE; font-weight: 700; border-radius: 0 3px 3px 0;'
  );
})();
