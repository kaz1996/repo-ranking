export const escapeSpecialChar = (str) => {
  const fixedStr = str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  return fixedStr;
};

export const htmlToElement = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
};

export const element = (string, ...values) => {
  const htmlString = string.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === 'string') {
      return result + escapeSpecialChar(value) + str;
    }
    return result + String(value) + str;
  });
  return htmlToElement(htmlString);
};

export const render = (containerElement, bodyElement) => {
  containerElement.innerHTML = '';
  containerElement.appendChild(bodyElement);
};
