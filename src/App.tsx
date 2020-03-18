import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PageLoader } from './shared/components/PageLoader';

const NotFound = () => (<div>404</div>);

const RestuarantsPage = React.lazy(() => 
  import('./modules/Restaurants').then(({ RestuarantsPage }) => ({ default: RestuarantsPage }))
);

const RestaurantDetailsPage = React.lazy(() => 
  import('./modules/RestaurantDetails').then(({ RestaurantDetailsPage }) => ({ default: RestaurantDetailsPage }))
);

class App extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <React.Suspense fallback={<PageLoader />}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={RestuarantsPage} />
                        <Route path="/details/:id" component={RestaurantDetailsPage} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Router>
            </React.Suspense>
        )
    }
}

export default App;
