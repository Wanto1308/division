import React from 'react';

const Suspensed = (Element) => function suspense(props) {
  return (
    <React.Suspense fallback={<div />}>
      <Element {...props} />
    </React.Suspense>
  );
};

export default {
  Home: Suspensed(React.lazy(() => import('./Home'))),
  Login: Suspensed(React.lazy(() => import('./Login'))),
  AddDivision: Suspensed(React.lazy(() => import('./AddDivision'))),
};
