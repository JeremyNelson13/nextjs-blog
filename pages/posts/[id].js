// pages files that begin and end with [] are dynamic routes in NextJs.
import Head from 'next/head'
import Layout from "../../components/layout";
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from "../../lib/posts";


export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}
// gets post Ids using staticpaths
export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        // 'paths' will contain the array of known paths returned by getAllPostIds
        // including the params defined by `pages/posts/[id].js`
        paths,
        fallback: false,
    }
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}