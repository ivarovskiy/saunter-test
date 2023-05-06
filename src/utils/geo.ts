export const defaultCenter = {
  lat: 48.472754596279486,
  lng: 35.019543083840055,
};

const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          resolve({ lat, lng });
        },
        () => {
          reject(defaultCenter);
        },
      );
    } else {
      reject(defaultCenter);
    }
  });
};

export { getBrowserLocation };
