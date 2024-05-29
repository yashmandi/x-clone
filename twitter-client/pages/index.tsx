import FeedCard from "@/Components/FeedCard";
import { BiHash, BiHomeCircle, BiImageAlt, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { QueryClient, useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface TwitterSidebarButton {
  title: string,
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: 'Home',
    icon: <BiHomeCircle />
  },
  {
    title: 'Explore',
    icon: <BiHash />
  },
  {
    title: 'Notifications',
    icon: <BsBell />
  },
  {
    title: 'Messages',
    icon: <BsEnvelope />
  },
  {
    title: 'Bookmarks',
    icon: <BsBookmark />
  },
  {
    title: 'Profile',
    icon: <BiUser />
  },
  {
    title: 'More',
    icon: <SlOptions />
  }
]

export default function Home() {

  const { user } = useCurrentUser();
  const queryClient = new QueryClient();

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
  }, [])

  console.log(user)

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found!`);

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Login successfull!");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken) window.localStorage.setItem('token', verifyGoogleToken);

      await queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
    [queryClient]
  )

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-1 relative ">
          <div className="text-3xl hover:bg-gray-900 rounded-full p-1 ml-3 h-fit w-fit cursor-pointer transition-all">
            <FaXTwitter />
          </div>
          <div className="mt-6 text-xl font-semibold">
            <ul>
              {sidebarMenuItems.map(item =>
                <li
                  className="flex justify-start items-center gap-4 hover:bg-gray-900 rounded-full px-5 py-2 w-fit cursor-pointer transition-all mt-2"
                  key={item.title}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              )}
            </ul>
            <button className="bg-[#1d9bf0] p-2 rounded-full w-52 mt-5">Tweet</button>
          </div>
          {user && <div className="absolute bottom-5 flex gap-2 items-center bg-slate-700 px-4 py-2 rounded-full">
            {user && user?.profileImageURL && <Image src={user?.profileImageURL} alt="user-image" height={50} width={50} className="rounded-full" />}
            <div className="text-xl">
              {user.firstName} {user.lastName}
            </div>
          </div>}
        </div>
        <div className="col-span-6 border-r-[0.1px] border-l-[0.2px] h-screen overflow-x-auto border-gray-700">
          <div>
            <div className='border border-r-0 border-l-0  border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer'>
              <div className='grid grid-cols-12'>
                <div className='col-span-1'>
                  {user?.profileImageURL && <Image
                    src={user?.profileImageURL}
                    className='rounded-full'
                    alt='user-image'
                    height={50}
                    width={50}
                  />}
                </div>
                <div className='col-span-11'>
                  <textarea
                    className="w-full bg-transparent text-xl px-3 py-1 border-b border-slate-700 outline-none"
                    rows={3}
                    placeholder="What's happening? ">
                  </textarea>
                  <div className="flex justify-between items-center">
                    <BiImageAlt onClick={handleSelectImage} className="text-xl mt-2 " />
                    <button className="bg-[#1d9bf0] font-semibold text-xs mt-2 py-1 px-4 rounded-full hover:bg-[#1a8cd8]">
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">
          {
            !user && (<div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="text-2xl font-semibold my-2">New to X?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
            )}
        </div>
      </div>
    </div>
  );
}
