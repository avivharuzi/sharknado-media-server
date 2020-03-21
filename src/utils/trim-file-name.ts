export default (s: string): string => {
  return s
    .replace(/[.,()'!_-]/g, ' ')
    .replace(/ +(?= )/g, '');
};
