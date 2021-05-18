import { Route, Switch } from 'react-router';
import Layout from './components/layout/Layout';
import AddDelivery from './pages/AddDelivery';
import Deliveries from './pages/Deliveries';
import NotFound from './pages/NotFound';
import LoadingMask from './components/UI/LoadingMask';

function App() {
  return (
    <>
      <LoadingMask />
      <Layout>
        <Switch>
          <Route exact path="/">
            <Deliveries />
          </Route>
          <Route exact path="/deliveries/add">
            <AddDelivery />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
