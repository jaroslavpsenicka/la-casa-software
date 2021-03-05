import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';
const NewsContext = createContext([{}, () => {}]);

const NewsProvider = ({children}) => {

  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("Time");
  const [news, setNews] = useState({ loading: true });

  const loadNextPage = () => {
    setNews(prev => { return { ...prev, loading: true }});
    Axios.get(`${SERVICE_URL}/api/news?sort=${sort}&page=${page+1}`)
      .then(response => { 
        setNews(prev => { return { loading: false, data: [ ...prev.data, ...response.data ]}})
        setPage(page + 1)})
      .catch(err => console.log('error loading page', page, err))
  }

  const saveRecord = ({ Id, Headlines, Description }) => {
    return Axios.put(`${SERVICE_URL}/api/news/${Id}`, { Headlines, Description })
      .then(response => {
        const idx = news.data.findIndex(r => r.Id === Id);
        news.data[idx] = response.data
        setNews(prev => { return { ...prev, data: news.data }})
      })
  }

  useEffect(() => {
    setNews(prev => { return { ...prev, loading: true }});
    Axios.get(`${SERVICE_URL}/api/news?sort=${sort}`)
      .then(response => setNews({ loading: false, data: response.data }))
      .catch(err => setNews({ loading: false, error: err }));
  }, [sort]);

  return (
    <NewsContext.Provider value={{news, setSort, loadNextPage, saveRecord}}>{children}</NewsContext.Provider>
  );
}

export { NewsContext, NewsProvider };