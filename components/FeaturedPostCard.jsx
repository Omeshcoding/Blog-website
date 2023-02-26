import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedPostCard = ({ post }) => {
  return (
    <div className=" relative h-72 hover:scale-x-[1.01] transition-all duration-500 sc">
      <div
        style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
        className="absolute rounded-lg bg-center bg-cover inline-block bg-no-repeat w-full h-72"
      />
      <div className="absolute bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72 rounded-lg" />
      <div className="absolute flex flex-col items-center justify-center w-full h-full rounded-lg p-4">
        <p className="text-white mb-4 text-shadow font-semibold text-xs">
          {moment(post.createdAt).format('MMM DD, YYYY')}
        </p>
        <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">
          {post.title}
        </p>
        <div className="flex items-center justify-center w-full bottom-5 absolute">
          <Image
            unoptimized
            src={post.author.photo.url}
            alt={post.author.name}
            height="30"
            width="30"
            className="align-middle  drop-shadow-lg rounded-full"
          />
          <p className="inline align-middle text-shadow ml-2 font-medium ">
            {post.author.name}
          </p>
        </div>
      </div>
      <Link href={`/post/${post.slug}`}>
        <span className="cursor-pointer absolute w-full h-full" />
      </Link>
    </div>
  );
};

export default FeaturedPostCard;
