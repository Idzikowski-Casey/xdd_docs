## xDD Document Linking

By harrnessing the power of [xDD](https://xdd.wisc.edu/api), this application allows users to
link terms for a given paper. Through the interface a user can browse already tracked terms in xDD and search for new ones. Users can view existing and searched terms in paper context utilizing the snippets route of the xDD api. 

## Development workflow

This app is built using React and Next.js, a Javascript web framework that allows
relatively simple server-side rendering. A mix of JSX and "hyperscript" semantics
are used for element trees. Typescript is used for editor integrations, but typings
are not complete and errors are swallowed.

[Macrostrat UI components](https://github.com/UW-Macrostrat/ui-components) are
used heavily for basic UI primitives (e.g. the infinite scrolling view).

1. `npm install` (submodule dependencies should also be installed by this step
   using a preinstall hook).
2. `npm run dev` will run the Next.JS dev server for the main codebase. It will
   also run compilation for the UI Component modules in the background. Unfortunately,
   the UI Components produce a lot of typescript errors on compilation, but these
   can be safely ignored.
3. The website should be available on `http://localhost:3000` or similar.
