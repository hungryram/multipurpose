import { useEffect } from 'react';
import Navbar from '../components/global/navbar';
import Footer from '../components/global/footer';
import { getClient } from '../lib/sanity.server';
import { appearances } from '../lib/queries';
import Head from 'next/head';
import Header from '../components/templates/header';

export const getStaticProps = async () => {

    const appearanceQuery = await getClient(false).fetch(appearances)
    const idxBody = `{idx_body}`
  
    return {
      props: {appearanceQuery, idxBody}
    };
  };
  
  const MyPage = ({ idxBody, appearanceQuery }) => {
    return (
      <div>
        <h1>IDX BODY</h1>
        {idxBody}
        <div className="mt-10">
            <div className="bg-black text-white">
                <h1>footer</h1>
            </div>
        </div>
      </div>
    );
  };
  
  export default MyPage;
  