import axios from "axios";

const fetchKnownTerms = async (docid) => {
  let route = "https://xdd.wisc.edu/api/articles";
  let params = { docid, known_terms: true };
  const res = await axios.get(route, { params });
  let data = res.data.success.data;
  let known_terms = {};

  data.map((dat) => {
    dat["known_terms"].map((obj) => {
      known_terms = { ...known_terms, ...obj };
    });
  });

  return known_terms;
};

const fetchPaperMetadata = async (docid) => {
  let route = "https://xdd.wisc.edu/api/articles";
  let params = { docid };
  const res = await axios.get(route, { params });
  let data = res.data["success"]["data"][0];

  const { title, link, identifier, journal, publisher, year } = data;

  let url = link[0]["url"];
  let doi: string;
  identifier.map((obj) => {
    if (obj["type"] == "doi") {
      doi = obj["id"];
    }
  });

  return { url, doi, title, journal, publisher, year };
};

export { fetchKnownTerms, fetchPaperMetadata };
