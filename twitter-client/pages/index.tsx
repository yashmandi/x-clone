import FeedCard from "@/Components/FeedCard";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";

interface TwitterSidebarButton {
  title: string,
  icon: React.ReactNode;
}

const sidebarMenuItems : TwitterSidebarButton [] =[
  {
    title: 'Home',
    icon: <BiHomeCircle/>
  },
  {
    title: 'Explore',
    icon: <BiHash/>
  },
  {
    title: 'Notifications',
    icon: <BsBell/>
  },
  {
    title: 'Messages',
    icon: <BsEnvelope/>
  },
  {
    title: 'Bookmarks',
    icon: <BsBookmark />
  },
  {
    title: 'Profile',
    icon: <BiUser/>
  },
  {
    title: 'More',
    icon: <SlOptions/>
  }
]


export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-3 pl-14 ">
          <div className="text-3xl hover:bg-gray-900 rounded-full p-1 ml-3  h-fit w-fit cursor-pointer transition-all">
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
        </div>
        <div className="col-span-6 border-r-[0.1px] border-l-[0.2px] h-screen overflow-x-auto border-gray-700">
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/> 
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  )
}
