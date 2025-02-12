module.exports = {
  darkMode: 'class', // Enable dark mode using a class
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkCustom: '#AFB9CA', // Ví dụ: màu nền tùy chỉnh cho dark mode
        customLight: '#1f2937',

        green: '#0CA406',
        bggreen:'#A5EFA5',
        darkGreen: '#324E32',

        pink: '#D80C5A',
        bgpink: '#F599B0',
        darkPink: '#58333C',

        blue: '#2A23AE',
        bgblue:'#C9C4FD',
        darkBlue: '#39374F',


        orange: '#EB9019',
        bgorange: '#FFE5AC',
        darkOrange: '#524833',

        red: '#E72B2B',
        bgred: '#FFACAC',
        darkRed: '#523535',

        yellow: '#DBDF04',
        bgyellow: '#F9FCC8',
        darkYellow: '#4F503F',

        purple: '#7600BF',
        bgpurple: '#ECC8FC',
        darkPurple: '#483C4E',

        colorother: '#0093A9',
        bgcolorother: '#B8F0FC',
        darkOther: '#35464A',
        
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Khai báo Roboto
      },
    },
  },
  plugins: [],
};
