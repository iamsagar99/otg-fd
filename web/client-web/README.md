# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# evoting-client



9:20:22 PM: [eslint]
9:20:22 PM: src/component/front/ballot.component.js
9:20:22 PM:   Line 2:10:   "NavLink" is defined but never used                                                                                                                                                              no-unused-vars
9:20:22 PM:   Line 26:25:  Redundant alt attribute. Screen-readers already announce `img` tags as an image. You don’t need to use the words `image`, `photo,` or `picture` (or any specified custom words) in the alt prop  jsx-a11y/img-redundant-alt
9:20:22 PM: src/component/front/card.component.js
9:20:22 PM:   Line 7:12:   Expected "===" and instead saw "=="                                                                                                                                                              eqeqeq
9:20:22 PM:   Line 31:25:  Redundant alt attribute. Screen-readers already announce `img` tags as an image. You don’t need to use the words `image`, `photo,` or `picture` (or any specified custom words) in the alt prop  jsx-a11y/img-redundant-alt
9:20:22 PM: src/component/front/nav.component.js
9:20:22 PM:   Line 1:10:  "useEffect" is defined but never used  no-unused-vars
9:20:22 PM:   Line 2:10:  "useState" is defined but never used   no-unused-vars
9:20:22 PM:   Line 5:8:   "img" is defined but never used        no-unused-vars
9:20:22 PM: src/pages/cms/admin/candidate/candidate-form.component.js
9:20:22 PM:   Line 79:8:  React Hook useEffect has a missing dependency: "formik". Either include it or remove the dependency array  react-hooks/exhaustive-deps
9:20:22 PM: src/pages/cms/admin/user/user-form.component.js
9:20:22 PM:   Line 38:8:    React Hook useEffect has a missing dependency: "formik". Either include it or remove the dependency array  react-hooks/exhaustive-deps
9:20:22 PM:   Line 196:45:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
9:20:22 PM:   Line 198:45:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
9:20:22 PM: src/pages/front/index.js
9:20:22 PM:   Line 28:5:  Duplicate key "RegisterPage"  no-dupe-keys
9:20:22 PM: src/pages/front/steps.page.js
9:20:22 PM:   Line 63:9:  Duplicate key "margin"  no-dupe-keys
9:20:22 PM: src/pages/front/vote.page.js
9:20:22 PM:   Line 4:24:   "Card" is defined but never used                                  no-unused-vars
9:20:22 PM:   Line 27:57:  Array.prototype.map() expects a return value from arrow function  array-callback-return
9:20:22 PM: src/services/auth.service.js
9:20:22 PM:   Line 4:9:    "useNavigate" is defined but never used  no-unused-vars
9:20:22 PM:   Line 38:28:  Expected "===" and instead saw "=="      eqeqeq
9:20:22 PM: src/services/candidate.service.js
9:20:22 PM:   Line 2:35:  "putRequest" is defined but never used  no-unused-vars
9:20:22 PM: src/services/election.service.js
9:20:22 PM:   Line 45:35:  Array.prototype.map() expects a return value from arrow function  array-callback-return
9:20:22 PM: src/services/result.service.js
9:20:22 PM:   Line 2:22:  "postRequest" is defined but never used    no-unused-vars
9:20:22 PM:   Line 2:35:  "putRequest" is defined but never used     no-unused-vars
9:20:22 PM:   Line 2:47:  "deleteRequest" is defined but never used  no-unused-vars
9:20:22 PM: src/services/vote.service.js
9:20:22 PM:   Line 3:10:  "getRequest" is defined but never used     no-unused-vars
9:20:22 PM:   Line 3:35:  "putRequest" is defined but never used     no-unused-vars
9:20:22 PM:   Line 3:47:  "deleteRequest" is defined but never used  no-unused-vars
9:20:22 PM: ​
9:20:22 PM: "build.command" failed                                        
9:20:22 PM: ────────────────────────────────────────────────────────────────
9:20:22 PM: ​
9:20:22 PM:   Error message
9:20:22 PM:   Command failed with exit code 1: npm run build
9:20:22 PM: ​
9:20:22 PM:   Error location
9:20:22 PM:   In Build command from Netlify app:
9:20:22 PM:   npm run build
9:20:22 PM: ​
9:20:22 PM:   Resolved config
9:20:22 PM:   build:
9:20:22 PM:     command: npm run build
9:20:22 PM:     commandOrigin: ui
9:20:22 PM:     environment:
9:20:22 PM:       - REACT_APP_AES_SECRET
9:20:22 PM:       - REACT_APP_BE_URL
9:20:22 PM:       - REACT_APP_CONTACT_PUBLIC_KEY
9:20:22 PM:       - REACT_APP_CONTACT_SERVICE_ID
9:20:22 PM:       - REACT_APP_CONTACT_TEMPLATE_ID
9:20:22 PM:       - REACT_APP_IMAGE_URL
9:20:22 PM:     publish: /opt/build/repo/build
9:20:22 PM:     publishOrigin: ui
9:20:22 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
9:20:22 PM: Failing build: Failed to build site
9:20:23 PM: Finished processing build request in 1m14.389s
9:20:22 PM: Failed during stage "b