import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  // const [name, setName] = useState({
  //   filters: {
  //     filterByName: {
  //       name: 'Tatoo',
  //     },
  //   },
  // });

  return (
    <div>
      <Provider>
        <Table />
      </Provider>
    </div>
  );
}

export default App;
