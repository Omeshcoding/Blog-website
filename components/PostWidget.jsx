import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
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
          <Link
            href={`/post/${post.slug}`}
            key={post.title}
            className="w-16 flex-none"
          >
            <Image
              src={post.featuredImage.url}
              unoptimized
              alt={post.title}
              height="60"
              width="60"
              className="align-middle rounded my-2"
            />
          </Link>

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
