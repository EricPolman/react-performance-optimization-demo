import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('../src/Page'), {
  ssr: true,
});

const Home: NextPage = () => {
  return <DynamicComponentWithNoSSR />;
};

export default Home;
