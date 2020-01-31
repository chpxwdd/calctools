import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import Page from './Page'
import BillCounter from './BillCounter'
// import BillCounter from './BillCounter'


export default class Root extends Component {
  render() {
    return (
      <div>
        <Page.NavbarTop title="Calculator tools" glyph={"calc"} />
        <Container>
          <Page.Header title="" lead="scene" />
          <div>
            <Switch>
              <Route exact path="/" render={() => { return (<div>HOME simple return</div>) }} />
              <Route exact path="/billcounter" component={BillCounter.Scene} />
            </Switch>
          </div>
        </Container>
      </div >
    )
  }
}
