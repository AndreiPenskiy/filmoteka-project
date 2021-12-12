function domI18n(options) {
  
  options = options || {};

  const rootElement = options.rootElement || window.document;
  const selector = options.selector || '[data-translatable]';
  const separator = options.separator || ' // ';
  const defaultLanguage = options.defaultLanguage || 'en';
  const languages = options.languages || ['en'];
  const enableLog = options.enableLog !== undefined ? options.enableLog : true;
  const noCacheAttr = 'data-no-cache';
  const translatableAttr = 'data-translatable-attr';
  let translatableCache = {};
  let currentLanguage = getLanguage(options.currentLanguage);

  function getLanguage(lang) {

    // If no current language was provided, uses default browser language
    if (!lang) {
      lang = window.navigator.languages ?
        window.navigator.languages[0] :
        (window.navigator.language || window.navigator.userLanguage);
    }

    // If language isn't on languages arr, try using a less specific ref
    if (languages.indexOf(lang) === -1) {
      if (enableLog) {
        console.warn(
          lang + ' is not available on the list of languages provided'
        );
      }
      lang = lang.indexOf('-') ? lang.split('-')[0] : lang;
    }

    // In the case that the lang ref is really not in the
    // languages list, switchs to default language instead
    if (languages.indexOf(lang) === -1) {
      if (enableLog) {
        console.error(
          lang + ' is not compatible with any language provided'
        );
      }
      lang = defaultLanguage;
    }

    return lang;
  }

  function changeLanguage(lang) {
    currentLanguage = getLanguage(lang);
    translateElements();
  }

  function clearCachedElements() {
    translatableCache = {};
  }

  function hasCachedVersion(elem) {
    const id = elem.getAttribute('data-dom-i18n-id');
    return id &&
      translatableCache &&
      translatableCache[id];
  }

  function setCacheData(elem, content) {
    const elemId = 'i18n' + Date.now() + (Math.random() * 1000);
    elem.setAttribute('data-dom-i18n-id', elemId);
    translatableCache[elemId] = content;
  }

  function getCachedData(elem) {
    return translatableCache &&
      translatableCache[
        elem.getAttribute('data-dom-i18n-id')
      ];
  }

  function getLanguageValues(elem, prop) {

    let translations = {};
    const hasChildren = elem.firstElementChild;
    const strings = !hasChildren && elem[prop].split(separator);

    languages.forEach(function (lang, index) {

      var child;

      if (hasChildren) {
        child = elem.children[index];
        if (child && child.cloneNode) {
          translations[lang] = child.cloneNode(true);
        }
      } else {
        child = strings[index];
        if (child) {
          translations[lang] = String(child);
        }
      }
    });

    return translations;
  }

  function translateElement(elem) {
    const attr = elem.getAttribute(translatableAttr);
    const noCache = elem.getAttribute(noCacheAttr) !== null;
    const prop = attr ? attr : 'textContent';
    var langObjs;
    var translated;

    if (!noCache && hasCachedVersion(elem)) {
      langObjs = getCachedData(elem);
    } else {
      langObjs = getLanguageValues(elem, prop);
      if(!noCache) {
        setCacheData(elem, langObjs);
      }
    }

    translated = langObjs[currentLanguage];

    if (typeof translated === 'string') {
      elem[prop] = translated;
    } else if (typeof translated === 'object') {
      translateChildren(elem, translated);
    }
  }

  function translateChildren(elem, translation) {
    cleanElement(elem);
    elem.appendChild(translation);
  }

  function cleanElement(elem) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  }

  // triggers the translation of all elements with the root element
  function translateElements() {
    var elems = (typeof selector == 'string' || selector instanceof String) ?
      rootElement.querySelectorAll(selector) :
      selector;
    for (var i = 0; i < elems.length; ++i) {
      translateElement(elems[i]);
    }
  }

  translateElements(selector);

  return {
    changeLanguage: changeLanguage,
    clearCachedElements: clearCachedElements
  };
};
const i18n = domI18n({
selector: '[data-translatable]',
separator: ' // ',
languages: ['en', 'uk', 'ru', 'pl'],
defaultLanguage: 'en',
});

const eng = document.getElementById('en');
const ukr = document.getElementById('uk');
const rus = document.getElementById('ru');
const pol = document.getElementById('pl');
const input = document.getElementById('input');


eng.addEventListener('click', evt => {
evt.preventDefault();
i18n.changeLanguage('en');
});

ukr.addEventListener('click', evt => {
evt.preventDefault();
i18n.changeLanguage('uk');
});

rus.addEventListener('click', evt => {
evt.preventDefault();
i18n.changeLanguage('ru');

});

pol.addEventListener('click', evt => {
evt.preventDefault();
i18n.changeLanguage('pl');

});


