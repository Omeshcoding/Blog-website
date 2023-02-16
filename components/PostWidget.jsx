import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  // console.log(getSimilarPosts(category, slug));
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <div className="bg-white text-black shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl font-semibold border-b pb-4 mb-6">
        {slug ? 'Related Post' : 'Recent Post'}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full">
          <div className="w-16 flex-none">
            <img
              src={post.featuredImage.url}
              alt={post.title}
              height="60px"
              width="60px"
              className="align-middle rounded-full my-2"
            />
          </div>

          <div className="flex-grow ml-4">
            <Link href={`/post/${post.slug}`} key={post.title}>
              {post.title}
            </Link>
            <p className="text-gray-500  text-xs">
              {moment(post.createdAt).format('MMM DD , YYYY')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
