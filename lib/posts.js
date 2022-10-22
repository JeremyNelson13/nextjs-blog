import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import html from 'remark-html'
// fs is a Node.js module that let's you read files from the file system.
// path is a Node.js module that let's you manipulate file paths.
// matter is a library that let's you parse the metadata in each markdown file.
// In Next.js, the lib folder does not have an assigned name like the pages folder, 
// so you can name it anything. It's usually convention to use lib or utils.


const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    //get filenames under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
        //remove .md suffix from filename to get id
        const id = fileName.replace(/\.md$/, '')

        //read markdown file as a string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        //gray-matter parses metadata
        const matterResult = matter(fileContents)

        //combine data with the id
        return {
            id,
            ...matterResult.data,
        }
    })
    // sort posts by creation date
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}

// get all post Ids, returns list of filenames (excludes .md) in the posts dir

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    // returns an array that looks like this:
    // [
    //     {
    //         params: {
    //             id: 'ssg-ssr'
    //         }
    //     },
    //     {
    //         params: {
    //             id: 'pre-rendering'
    //         }
    //     }
    // ]
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    // gets id from posts directory and returns fullpath, post id
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // gray-matter parses the post's metadata section
    const matterResult = matter(fileContents)
    // remark library converts markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()
    // data, id, and contentHTML are combined and returned
    return {
        id,
        contentHtml,
        ...matterResult.data,
    }
}