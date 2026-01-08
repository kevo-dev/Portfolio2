'use client';

import React from 'react';
import App from '../App';

/**
 * Next.js requires all files in the app directory to have a valid default export.
 * This page component renders the main App, which handles the internal 
 * routing logic based on the current path and hash.
 */
export default function BlogRoute() {
  return <App />;
}
