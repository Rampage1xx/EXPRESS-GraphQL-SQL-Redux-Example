/*
import  * as  React from 'react'

declare const System: any;

function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component<any, any> {
       public static Component = null;
      public  state = { Component: AsyncComponent.Component };

       private componentWillMount() {
            if (!this.state.Component) {
                getComponent().then(Component => {
                    AsyncComponent.Component = Component
                    this.setState({ Component })
                })
            }
        }
       public render() {
            const { Component } = this.state
            if (Component) {
                return <Component {...this.props} />
            }
            return null
        }
    }
}

export  const MyImagesAsync = asyncComponent(() =>
System.import('../Component/UserImages/MyImages').then(module => module.default))
*/

/*
const App = () =>
    <BrowserRouter>
        <Link to="/foo">Foo</Link>
        <Link to="/bar">Bar</Link>

        <Match pattern="/foo" component={Foo} />
        <Match pattern="/bar" component={Bar} />
    </BrowserRouter>
*/
