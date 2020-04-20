import React, {createContext, useState, Component, useEffect} from 'react'
import Head from 'next/head'
import BasePage from '../components/base-page'
import dynamic from 'next/dynamic'
import h from 'react-hyperscript'
import "@macrostrat/ui-components/lib/index.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import {InputGroup, Callout, Button, Intent} from "@blueprintjs/core"
import { useSearchString } from '../components/search'
import {LinkCard} from '../components/link-card'

const loadCard = async function(){
  const mod = await import('../ui-components/components/infinite-scroll')
  return mod.InfiniteScrollResultView
}
const InfiniteScrollResultView = dynamic(loadCard, { ssr: false });

const loadRefCard = async function(){
  const mod = await import('@macrostrat/ui-components')
  return mod.GddReferenceCard
}
const GddReferenceCard = dynamic(loadRefCard, { ssr: false });

const Highlight = ({highlight})=> {
  return <li dangerouslySetInnerHTML={{__html : highlight}} />
}

const Highlights = ({highlights}) => {
    if (highlights == null) return null
    return <ul>{highlights.slice(0,5).map( highlight => {
      return <Highlight highlight={highlight} />
    })}
    </ul>
}

const PaperResult = ({paper}) => {
    return <LinkCard className={`${paper._gddid} hit`} href={`/article/${paper._gddid}`}>
      <h2>{paper.title}</h2>
      <Highlights highlights={paper.highlight} />
    </LinkCard>
}

const PublicationSnippets = (props) => {
  const {name, papers} = props;
  return <div className='publication'>
    <h1 className="journal-title">{name}</h1>
    <div>{papers.map((paper, i) => {
      return h(PaperResult, {key: i, paper})
    })}</div>
  </div>
};

const SnippetResults = (props) => {
  const {items, count} = props
  let results = {}
  items.map ( (art) => {
      if ( !(art["pubname"] in results) ) {
          results[art['pubname']] = []
      }
      results[art['pubname']].push(art)
  } )
  const pubNames = Object.keys(results);

  let countItem = null;
  if (count != null) {
    countItem = <p className="count">{`${count} articles found.`}</p>
  }

  return <div className='results'>
    {countItem}
    <div className="snippets">
      {pubNames.map((pub,i) => h(PublicationSnippets, {name: pub, papers: results[pub], key: i}))}
    </div>
  </div>
}

const ResultView = (props)=>{
  const {searchString, debounce} = props;

  if (searchString != null && searchString != '') {
      return <InfiniteScrollResultView
          route="https://geodeepdive.org/api/snippets"
          params={{"term":searchString, "full_results": true, inclusive: true, article_limit: 2}}
          unwrapResponse={res=>res.success}>
          {SnippetResults}
      </InfiniteScrollResultView>
  }
  return <Callout icon="alert" title="Snippets"
    intent="info">
    Search xDD for contextual use of a term or phrase.
  </Callout>

}

const SnippetsPage = (props)=>{
  const [searchString, updateSearchString] = useSearchString("/snippets");
  const [inputValue, setInputValue] = useState("");
  // Set input value to search string when it changes (enables default search behaviour)
  useEffect(()=>{
    setInputValue(searchString)
  }, [searchString])


  return <BasePage title="snippets search">
    <div className="searchbar">
      <InputGroup
        className="main-search"
        placeholder="Enter a search term"
        leftIcon="search"
        large
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            updateSearchString(event.target.value);
          }
        }}
      />
      <Button icon='arrow-right' large onClick={()=>{
        updateSearchString(inputValue)
      }
      }/>
    </div>
    <ResultView searchString={searchString} />
  </BasePage>
}

export default SnippetsPage