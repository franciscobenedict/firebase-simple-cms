import React                                            from 'react';
import { BrowserRouter as Router, Switch, Route }       from 'react-router-dom';
import NotFound404                                      from './components/NotFound404';
import EmailVerificationView                            from './components/EmailVerificationView';
import EmailNotVerifiedView                             from './components/EmailNotVerifiedView';
import Navigation                                       from './components/Navigation';
import Footer                                           from './components/Footer';
import LandingView                                      from './components/LandingView';
import { AuthProvider }                                 from './store/Auth';

function App() {

  return (
    <AuthProvider >
      <Router>

        <Navigation />

        <Switch>
          <Route exact path="/" component={LandingView} />
          <Route exact path="/emailverification" component={EmailVerificationView} />
          <Route exact path="/emailnotverified" component={EmailNotVerifiedView} />

          <Route path="*" component={NotFound404} />
        </Switch>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
