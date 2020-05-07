/*global Promise*/
import { Platform, Linking } from 'react-native';
import { GoogleMaps, AppleMaps, CityMapper, Uber, Lyft, Transit, Waze, Moovit } from './img';

const apps = [
  
  { name: 'waze', title: 'Waze', prefixe: 'waze://', icon: Waze },
 
];

const isAppInstalled = (app) => {
  return new Promise((resolve) => {
    Linking.canOpenURL(app).then((result) => {
      resolve(!!result);
    }).catch(() => {
      resolve(false);
    });
  });
};

export const getApps = () => {
  const promises = apps.map((app) => isAppInstalled(app.prefixe).then((ret) => (ret) ? app : null));

  return Promise.all(promises).then((returnPromises) => {
    return returnPromises.filter((app) => (app));
  });
};
