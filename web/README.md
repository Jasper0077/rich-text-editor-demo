## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Overview

Rich Text Editor demo Next app to play around.

## Choices

1. `Draft.js` requires additional configuration to run it in Nextjs app. But, it's compatible with React.js.
2. `react-quill` is the wrapper for `Quill` to run it on React or Next app. However, the package is not keeping up with the latest version of React and Next. The last major commit was two years ago. But, if you are using an older version of Next app, it pretty simple to use. Just, plug in the component you import from the package. It has the duplicated toolbar problem...
3. `Tiptap` is the current solution for this project. Simple and straightforward. It has a huge growing community, good documentation and blogs for technical supports.