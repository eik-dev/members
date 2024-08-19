'use client'
import { useEffect } from 'react';

function Error({ statusCode }) {
  useEffect(() => {
    // report
  }, []);

  return (
    <div className='flex items-center justify-center w-[100vh] h-[100vh]' >
      <h1>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client-side'}</h1>
      <p>Please try again later or contact support.</p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;