# The Rick and Morty explorer

To install the project just clone the repo and run 
```bash
npm install or yarn install
```
Then just run the application in dev mode with
```bash
npm start or yarn start
```
Otherwise build the project and serve it
```bash
npm run build && npx serve -S build or yarn build && npx serve -S build
```

## Folder Structure

The folder structure used in this project tries to follow a functional domain separation of concerns. Every folder is intended to build a feature with every component or functionality that is unique for that feature. As an example in the project there is the Results folder that contains a page (screen) and all the relative components that are used to display the fetched results on the page.

The base components that should be reused through the entire app are located in the root components folder, those components are built trying to let them be customized for the use case that they have to match. A good example in the project is the Card component that is just a wrapper around the Chakra-UI Card and is used as the base for the ProfileCard component in the Results domain.

## Design goals

The main point of the application is to display a list of cards that represents a character in the fictional universe of Rick and Morty. After a quick glance on the api's docs I've figured out that I would not be able to aggregate data with some kind of endpoint call. So I had to do that by hand on the frontend; at first I though of just downloading every episode and every location data in order to display it on the character's profile card, but I wasn't satisfied with that solution. Then I tried to narrow down at the minimum the amount of API requests for a single set of characters (20-ish) to 3 requests:

1. Characters request
2. Locations request
3. Episodes request

That was possible thanks to the filtering that the API supports, and with the help of react Hooks and Context I've a "main" data source in which are stored the characters, the locations and the episodes that I need for showing the current page in the app.

## Libraries

- [Chakra UI](https://chakra-ui.com/)
- [use-immer](https://github.com/immerjs/use-immer)
- [react-error-boundary](https://www.npmjs.com/package/react-error-boundary)
- [rickandmorty api client](https://github.com/afuh/rick-and-morty-api-node)

## Improvements
- Add unit and integration tests
- Improve the caching of episodes and locations, the goal should be to request only the episodes/locations that are not currently fetched and not fetch every location/episode needed for the set of characters every time that the page is changed
- Add pagination to the episodes list, the UI is ugly
- Add routing and routes to the single Character/Episode/Location
- Add documentation and comments to components/hooks/functions