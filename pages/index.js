import Head from 'next/head';
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

// imports getsortedpostsdata from lib, async getstaticprops allows statics to be loaded at
// build speeding up rendertime for users.

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
// allPostsData is returned as a prop which can be accessed in the home function



export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Hello, this is a simple personal blogging app created using the tutorial from Nextjs. My name is Asher, I am
          a recent graduate of a fullstack software development bootcamp with NCSU and ThriveDX. I enjoy learning about new
          languages and technologies, and try to write code every day.]</p>
      </section>
      {/* this section will map and display the blogposts */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
              <Date dateString={date} />
              </small>              
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}