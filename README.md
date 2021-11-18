### Before you start coding

- [ ] Change the `favicon.png`, `apple-touch-icon.png`, `android-chrome-192x192.png` and `android-chrome-512x512.png`. [favicon.io](https://favicon.io) is a cool tool for generating these assets.
- [ ] If you don't plan to use `react-query`, remove the query client logic in the `main.tsx` file.
- [ ] Change the title, description and theme color in the `index.html` and `vite.config.ts`. [Inter font](https://rsms.me/inter/) is included, so remove it if you want.
- [ ] Change the `name` field in package.json.

### Development

Just run `yarn dev`.

### Production

Run `yarn build`. The generated files will be on the `dist` folder.

### Testing

Run `yarn test`. Tests are performed on production build, so be sure to build your app first.
