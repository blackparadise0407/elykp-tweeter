import { ApolloProvider } from '@apollo/client'
import { motion, AnimatePresence } from 'framer-motion'
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from 'app/App'
import { Backdrop, Spinner } from 'components'
import { ToastProvider } from 'contexts/toast/ToastContext'
import { client } from 'graphqlClient'

import reportWebVitals from './reportWebVitals'

import './i18n'
import './index.css'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <ToastProvider>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <AnimatePresence>
                    <Suspense
                        fallback={
                            <motion.div className="">
                                <Backdrop centerChildren>
                                    <Spinner size="lg" />
                                </Backdrop>
                            </motion.div>
                        }
                    >
                        <App />
                    </Suspense>
                </AnimatePresence>
            </BrowserRouter>
        </ApolloProvider>
    </ToastProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
