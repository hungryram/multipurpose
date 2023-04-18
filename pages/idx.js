
export const getStaticProps = async () => {
  
    return {
      props: {
        idx_body: `{idx_body}`,
      },
    };
  };
  
  const MyPage = ({ idx_body }) => {
    return (
      <div>
        <h1>IDX BODY</h1>
        {idx_body}
      </div>
    );
  };
  
  export default MyPage;
  