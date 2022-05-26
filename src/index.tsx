import { ApolloProvider } from '@apollo/client'
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from 'app/App'
import { client } from 'graphqlClient'

import reportWebVitals from './reportWebVitals'
import './i18n'
import './index.css'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Suspense fallback="Loading...">
                <App />
            </Suspense>
        </BrowserRouter>
    </ApolloProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
