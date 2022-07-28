import decode from "jwt-decode";
import confetti from "canvas-confetti";
import { categories } from "../data/categories";

export const formatMoney = (value) => {
  let val = (value / 1).toFixed(0).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  if (!token) {
    return false;
  }

  const decodedToken = decode(token);

  if (decodedToken.exp * 1000 < new Date().getTime()) {
    return false;
  }

  return true;
};

export const runConfetti = () => {
  var count = 200;
  var defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const removeAccents = (str) => {
  let name = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
  return name.replace(/\s/g, "-").replace(".", "").toLowerCase();
};

export const getNameCategory = (code) => {
  let name = "";

  for (let i = 0; i <= categories.length; i++) {
    if (categories[i]?.route === code) {
      return (name = categories[i].name);
    }

    if (categories[i]) {
      for (let j = 0; j < categories[i].subCategories.length; j++) {
        if (categories[i]?.subCategories[j].route === code) {
          return (name = categories[i].subCategories[j].name);
        }

        for (
          let k = 0;
          k < categories[i].subCategories[j].subCategories.length;
          k++
        ) {
          if (categories[i].subCategories[j].subCategories[k].href === code) {
            return (name =
              categories[i].subCategories[j].subCategories[k].name);
          }
        }
      }
    }
  }

  return name;
};
