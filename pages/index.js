import React, { useEffect, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const words = [
  ['sári',    '👧🏻'],
  ['alma',    '🍎'],
  ['kukac',   '🐛'],
  ['bori',    '🐕‍🦺'],
  ['cica',    '🐈'],
  ['sapka',   '🧢'],
  ['vödör',   '🪣'],
  ['felhő',   '☁️'],
  ['bicikli', '🚲'],
  ['fog',     '🦷'],
  ['rendőr',  '👮🏻‍♀️'],
  ['tű',      '🪡'],
  ['táska',   '🎒'],
  ['rák',     '🦀'],
  ['zebra',   '🦓'],
  ['egér',    '🐀'],
  ['banán',   '🍌'],
]

const Example = () => {
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd: () => null,
  });

  const letterMap = {
    a: 'a',
    á: 'áh',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    é: 'éh',
    f: 'f',
    g: 'g',
    h: 'h',
    i: 'i',
    í: 'íh',
    j: 'j',
    k: 'k',
    l: 'l',
    m: 'm',
    n: 'n',
    o: 'o',
    ó: 'óh',
    ö: 'öh',
    ő: 'őh',
    p: 'p',
    q: 'q',
    r: 'r',
    s: 's',
    t: 't',
    u: 'u',
    ú: 'úh',
    ü: 'üh',
    ű: 'űh',
    v: 'v',
    x: 'x',
    y: 'y',
    z: 'z',
  }


  const [letterIndex, setLetterIndex] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [isEmojiVisible, showEmoji] = useState(false)

  useEffect(() => {
    if (words[wordIndex]?.[0].length === letterIndex){
      speak({ text: words[wordIndex]?.[0], voice: voices[0] })
      showEmoji(true)

      setTimeout(() => {
        showEmoji(false)
        setWordIndex(wordIndex === words.length - 1 ? 0 : wordIndex + 1)
        setLetterIndex(0)
      }, 2500)
    }
  }, [letterIndex])

  const handleKeyDown = ({ key }) => {
    if (Object.keys(letterMap).includes(key)){
      speak({ text: letterMap[key], voice: voices[0] })
    }

    if (key === words[wordIndex]?.[0][letterIndex]){
      setLetterIndex(letterIndex + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])



  return (
    <>
    <div style={{ padding: 50, fontSize: 148, fontWeight: 'bold', textTransform: 'uppercase' }}>
      {words[wordIndex]?.[0]?.split('').map((letter, i) => (
        <span key={i} style={{ color: i < letterIndex ? 'black' : 'gray' }}>{letter}</span>
      ))}
    </div>
    <div style={{ fontSize: 200, margin: 50 }}>{isEmojiVisible && words[wordIndex][1]}</div>
    </>
  );
};

export default Example