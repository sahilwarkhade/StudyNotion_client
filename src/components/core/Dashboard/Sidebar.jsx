import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink";
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }


  const handleSidebarOpen = (e) => {
    e.stopPropagation()
    setIsSideBarOpen(prev=>!prev)
  };
  return (
    <>
      
      <div className={"flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 max-md:absolute "+(isSideBarOpen ? "max-md:left-0 max-md:top-0" :"max-md:-left-48 max-md:top-0")+ " transition-all duration-300 z-40"}>
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      <button className={"md:hidden absolute top-3 " + (isSideBarOpen ? "left-48" :  "left-0.5") + " text-white transition-all duration-300 z-40 "} onClick={handleSidebarOpen}>
           {/* <BsChevronDoubleRight /> */}
           {isSideBarOpen ? <FaArrowAltCircleLeft className="text-2xl"/> :<FaArrowAltCircleRight className="text-2xl"/>}
      </button>
      
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}