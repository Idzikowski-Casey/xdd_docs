import React, { createContext, useEffect, useReducer } from "react";
import { fetchKnownTerms } from "./fetch";

//////////////////////// types //////////////////////
type docid = { docid: string };
type known_terms = { known_terms: object[] };
type snippet_term = { snippet_term: string };
type paper_title = { paper_title: string };
type linked_terms = { linked_terms: [][] };
type index = { index: number };

///////////////////// Async Actions ///////////////////
type fetch_known_terms = { type: "fetch_known_terms"; payload: docid };

//////////////////// Sync Actions ////////////////////
type set_known_terms = { type: "set_known_terms"; payload: known_terms };
type set_docid = { type: "set_docid"; payload: docid };
type set_snippet_term = { type: "set_snippet_term"; payload: snippet_term };
type set_paper_title = { type: "set_paper_title"; payload: paper_title };
type set_linked_terms = { type: "set_linked_terms"; payload: linked_terms };
type remove_linked_term = { type: "remove_linked_term"; payload: index };
type add_new_term = { type: "add_new_term"; payload: snippet_term };
type reset_state = { type: "reset_state" };

//////////////////// Union Actions ///////////////////////

type SyncAppActions =
  | set_known_terms
  | set_docid
  | set_snippet_term
  | set_paper_title
  | set_linked_terms
  | remove_linked_term
  | add_new_term
  | reset_state;
type AsyncAppActions = fetch_known_terms;

interface appCTX {
  state: {};
  runAction(action: SyncAppActions | AsyncAppActions): Promise<void>;
}

interface stateCTX {
  docid: string;
  known_terms: object;
  snippet_term: string;
  paper_title: string;
  linked_terms: [][];
}
const defaultState: stateCTX = {
  docid: "",
  known_terms: {},
  snippet_term: "",
  paper_title: "",
  linked_terms: [],
};

function useAppContextActions(dispatch) {
  // maybe state and action??
  return async (action: SyncAppActions | AsyncAppActions) => {
    switch (action.type) {
      case "fetch_known_terms": {
        const docid = action.payload.docid;
        const known_terms = await fetchKnownTerms(docid);
        return dispatch({ type: "set_known_terms", payload: { known_terms } });
      }
      default:
        return dispatch(action);
    }
  };
}

const appReducer = (state = defaultState, action: SyncAppActions) => {
  switch (action.type) {
    case "set_docid":
      return {
        ...state,
        docid: action.payload.docid,
      };
    case "set_known_terms":
      return {
        ...state,
        known_terms: action.payload.known_terms,
      };
    case "set_snippet_term":
      console.log("In reducer", action.payload.snippet_term);
      return {
        ...state,
        snippet_term: action.payload.snippet_term,
      };
    case "set_paper_title":
      return {
        ...state,
        paper_title: action.payload.paper_title,
      };
    case "set_linked_terms":
      let LinkedTerms = [...state.linked_terms, action.payload.linked_terms];
      return {
        ...state,
        linked_terms: LinkedTerms,
      };
    case "remove_linked_term":
      const index = action.payload.index;
      let terms = [...state.linked_terms];
      terms.splice(index, 1);
      return {
        ...state,
        linked_terms: terms,
      };
    case "add_new_term":
      let known_terms = { ...state.known_terms };
      let exists = Object.keys(known_terms).includes("new_terms");
      if (exists) {
        known_terms["new_terms"] = [
          ...known_terms["new_terms"],
          action.payload.snippet_term,
        ];
        return {
          ...state,
          known_terms: known_terms,
        };
      } else {
        known_terms["new_terms"] = [action.payload.snippet_term];
        return {
          ...state,
          known_terms: known_terms,
        };
      }
    case "reset_state":
      return {
        ...defaultState,
      };
    default:
      throw new Error("What does this mean?");
  }
};

const defaultContext = { state: defaultState, async runAction() {} };

const AppContext = createContext<appCTX>(defaultContext);

function AppContextProvider(props) {
  const [state, dispatch] = useReducer(appReducer, defaultState);
  const runAction = useAppContextActions(dispatch);

  useEffect(() => {
    if (state.docid != "") {
      runAction({
        type: "fetch_known_terms",
        payload: { docid: state.docid },
      });
    }
  }, [state.docid]);

  return (
    <AppContext.Provider value={{ state, runAction }}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };
