import React, { PureComponent } from 'react'

type Prop = {}

type State = Readonly<{}>

class App extends PureComponent<Prop, State> {

    readonly state: State = {}

    render() {
        return (
            <div>
                create order
                check order/delivery status
                check item availability
                <h1>
                    lol is u ded
                </h1>
                <h5>
                    no me not
                </h5>
            </div>
        )
    }

}

export default App