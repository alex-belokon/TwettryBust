export function avatarColor(letter='U') {
  const updateLetter = letter.toLocaleUpperCase();
  const colorMap = {
    A: 'colorLetterFirst',
    B: 'colorLetterFirst',
    C: 'colorLetterFirst',
    D: 'colorLetterFirst',
    E: 'colorLetterFirst',
    F: 'colorLetterSecond',
    G: 'colorLetterSecond',
    H: 'colorLetterSecond',
    I: 'colorLetterSecond',
    J: 'colorLetterSecond',
    K: 'colorLetterThird',
    L: 'colorLetterThird',
    M: 'colorLetterThird',
    N: 'colorLetterThird',
    O: 'colorLetterThird',
    P: 'colorLetterFourth',
    Q: 'colorLetterFourth',
    R: 'colorLetterFourth',
    S: 'colorLetterFourth',
    T: 'colorLetterFourth',
    U: 'colorLetterFifth',
    V: 'colorLetterFifth',
    W: 'colorLetterFifth',
    X: 'colorLetterFifth',
    Y: 'colorLetterFifth',
    Z: 'colorLetterFifth',
  };

  return colorMap[updateLetter] || 'colorOther';
}
