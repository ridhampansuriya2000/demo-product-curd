'use client'

import "./globals.css";

import { Provider } from 'react-redux';
import { store, persistor } from './../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import AuthRedirect from "@/components/wrapper/AuthRedirect";

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {



  return (
      <html lang="en">
      <head />
      <body className="font-sans bg-gray-50">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AuthRedirect>{children}</AuthRedirect>
        </PersistGate>
      </Provider>
      </body>
      </html>
  );
}
