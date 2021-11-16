import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Users from "./layouts/users"
import Main from "./layouts/main"
import Login from "./layouts/login"
import NavBar from "./components/ui/navBar"
import { ProfessionProvider } from "./hooks/useProfession"
import { QualitiesProvider } from "./hooks/useQualities"

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <QualitiesProvider>
                    <ProfessionProvider>
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                    </ProfessionProvider>
                </QualitiesProvider>
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </div>
    )
}

export default App