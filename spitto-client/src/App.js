import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './App.css';
import Speetto from './components/Speetto';

const theme = createMuiTheme();

function App() {
  const [speettos, setSpeettos] = useState({});
  const [rendering, setRendering] = useState(true);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!rendered) {
        setRendering(true);
        let res = await axios.get('/api/speetto');
        console.log(res.data);
        setSpeettos(res.data.data);
        setRendered(true);
        setRendering(false);
      }
    }

    fetchData();
  }, [rendered, rendering])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {rendering ? 'rendering' : <Speetto speettoInfos={speettos} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
