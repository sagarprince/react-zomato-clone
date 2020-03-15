import React from 'react';
import { RestuarantsPage } from './modules/restaurants';

class App extends React.PureComponent<{}, {}> {
    public render() {
        return (
          <React.Fragment>
            <RestuarantsPage />
          </React.Fragment>
        )
    }
}

export default App;
