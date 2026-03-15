import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  webExt: {
    binaries: {
      brave: '/home/erick/Documents/brave-browser-nightly-1.90.31-linux-amd64/brave',
      firefox: '/home/erick/Documents/firefox-dev/firefox-bin', // "wxt -b fox"
    },
    startUrls: ["http://192.168.1.254"],
  },
});
