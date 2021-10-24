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

export { fetchKnownTerms };
