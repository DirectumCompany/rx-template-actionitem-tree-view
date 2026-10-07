// Побочный импорт — просто "применить стили"
declare module '*.css';

// CSS-модули — объект { [className: string]: string }
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Препроцессоры
declare module '*.scss';
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.sass';
declare module '*.less';