import Head from 'next/head';

export default function MyPage() {
  return (
    <>
      <Head>
        <title>My Page</title>
      </Head>

      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main>
        <div dangerouslySetInnerHTML={{__html: `
          <h1>Welcome to My Page</h1>
          <p>This is some text.</p>
          {idx_body}
        `}} />
      </main>

      <footer>
        <p>&copy; 2023 My Page, All Rights Reserved</p>
      </footer>
    </>
  );
}
