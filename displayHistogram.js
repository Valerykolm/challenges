/*Реализуйте и экспортируйте по умолчанию функцию, которая выводит на экран вертикальную гистограмму.
Функция принимает на вход количество бросков кубика и функцию, которая имитирует бросок игральной кости
(её реализовывать не нужно). Вызов этой функции генерирует значение от 1 до 6, что соответствует одной 
из граней игральной кости.

Гистограмма содержит столбцы, каждому из которых соответствует грань игральной кости и количество 
выпадений этой грани. Результаты отображаются графически (с помощью символов #) и в виде процентного 
значения от общего количества бросков, за исключением случаев, когда количество равно 0 (нулю).

Дополнительные условия:

- Процентные значения должны быть прижаты влево относительно столбца.
- Значения сторон игральной кости должны быть посредине столбца.
- Столбцы между собой разделены пробелом
- Количество секций в столбце (высота столбца) должно соответствовать количеству выпадений каждой
  из сторон игральной кости.*/

const _ = require('lodash');  

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const dice = () => {
  return getRandomInt(1,7);
}

const displayHistogram = (roundsCount, rollDie) => {
  const bar = '### ';
  const numbers = _.times(roundsCount, rollDie);
  const sides = _.range(1, 7);
  //Формирование горизонтальной диаграммы
  const lines = sides.map((side) => {
    const count = numbers.filter((number) => number === side).length;
    const displayCount = count !== 0 ? ` ${count}` : '';
    return `${side} --- ${bar.repeat(count)}${Math.round(100*displayCount / roundsCount)}%`;
  });
  const matrix = lines.map((line) => line.split(' '));
  //const matrix = matrixSplit.map((el) => el.length < 3 ? el.padStart(1) : el);
  //Поворот диаграммы
  const rotate = (matrix) => {
    const rowsCount = matrix.length;
    const columnsCount = matrix.reduce((acc, line) => acc < line.length ? line.length : acc, 0);
    const rotated = [];

    for (let row = 0; row < columnsCount; row += 1) {
      rotated[row] = [];
      for (let column = 0; column < rowsCount; column += 1) {
        rotated[row][column] = matrix[column][columnsCount - row - 1] !== undefined ? matrix[column][columnsCount - row - 1] : '   ';
      }
    }
    //const str = rotated.join('\n');
    return rotated;
  }
  
  return rotate(matrix);
}

console.log(displayHistogram(32, dice));
// =>                 28%
//                    ###
//                    ###
//            19%     ###
//            ### 16% ### 16%
//    13%     ### ### ### ###
//    ### 9%  ### ### ### ###
//    ### ### ### ### ### ###
//    ### ### ### ### ### ###
//    ### ### ### ### ### ###
//    -----------------------
//     1   2   3   4   5   6
 
//displayHistogram(13, rollDie);
// =>                 31% 31%
//                    ### ###
//        15%     15% ### ###
//        ### 8%  ### ### ###
//        ### ### ### ### ###
//    -----------------------
//     1   2   3   4   5   6