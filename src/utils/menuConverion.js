export const convertedMenu = menu => {
  let convertedMenu = "";

  for (let i = 0; i < menu.length; i++) {
    menu[i] = menu[i].food + "-" + menu[i].price;
  }

  for (let i = 0; i < menu.length; i++) {
    i < menu.length - 1
      ? (convertedMenu += menu[i] + ", ")
      : (convertedMenu += menu[i]);
  }

  return convertedMenu;
};
