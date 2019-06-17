import React, { PureComponent } from 'react'

type Prop = {}

type State = Readonly<{}>

class Home extends PureComponent<Prop, State> {

    readonly state: State = {}

    render() {
        return (
            <div>
                <h1>
                    404 
                </h1>
                <h2>
                    not found
                </h2>
            </div>
        )
    }

}

export default Home