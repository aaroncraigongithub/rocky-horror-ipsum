import capitalize from 'underscore.string/capitalize';
import words from '../../assets/words';

function getRandom(min, max) {
  const r = (max - min) + 1;

  return Math.floor((Math.random() * r) + min);
}

function getSentence() {
  const count = getRandom(10, 20);
  const offset = getRandom(0, words.length - count);

  const sentence = words.slice(offset, offset + (count + 1)).join(' ');

  return `${capitalize(sentence)}.`;
}

function getSentenceCount(size) {
  const min = size === 'short' ? 3 : 7;
  const max = size === 'short' ? 5 : 12;

  return getRandom(min, max);
}

function getParagraph(size) {
  const sentenceCount = getSentenceCount(size);
  const sentences = [];

  while (sentences.length < sentenceCount) {
    sentences.push(getSentence());
  }

  return sentences.join(' ');
}

export default function getIpsum(paraCount, size) {
  const paras = [];

  while (paras.length < paraCount) {
    paras.push(getParagraph(size));
  }

  return paras;
}
