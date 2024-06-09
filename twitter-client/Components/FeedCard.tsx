import React from 'react'
import Image from 'next/image'
import { BiMessageRounded, BiUpload } from 'react-icons/bi'
import { FaRetweet } from 'react-icons/fa6'
import { AiOutlineHeart } from 'react-icons/ai'
import { Tweet } from "@/gql/graphql"

interface FeedCardProps {
    data: Tweet
}

const FeedCard: React.FC = (props) => {
    const { data } = props

    return <div>
        <div className='border border-r-0 border-l-0  border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer'>
            <div className='grid grid-cols-12'>
                <div className='col-span-1'>
                    {data.author?.profileImageURL && <Image
                        src={data.author?.profileImageURL}
                        className='rounded-full'
                        alt='user-image'
                        height={50}
                        width={50}
                    />}
                </div>
                <div className='col-span-11 pl-2'>
                    <h5>{data.author?.firstName} {data.author?.lastName}</h5>
                    <p >
                        {data.content}
                    </p>
                    <div className='flex justify-between mt-5 text-xl items-between pr-8 '>
                        <div>
                            <BiMessageRounded />
                        </div>
                        <div>
                            <FaRetweet />
                        </div>
                        <div>
                            <AiOutlineHeart />
                        </div>
                        <div>
                            <BiUpload />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default FeedCard