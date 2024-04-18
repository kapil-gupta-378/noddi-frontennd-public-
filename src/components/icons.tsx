import React from 'react'
import { CiUser, CiLock } from 'react-icons/ci'
import { FaUser, FaLock, FaCode, FaRegCreditCard, FaUserCircle, FaPeopleArrows } from 'react-icons/fa'
import { AiFillFileAdd, AiTwotoneBell, AiOutlineTeam } from 'react-icons/ai'
import { SiBlueprint } from 'react-icons/si'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { FcCollaboration } from 'react-icons/fc'

const icons = {
  CiUser: CiUser,
  CiLock: CiLock,
  FaLock: FaLock,
  FaUser: FaUser,
  FaCode: FaCode,
  AiFillFileAdd: AiFillFileAdd,
  FaRegCreditCard: FaRegCreditCard,
  SiBlueprint: SiBlueprint,
  FaUserCircle: FaUserCircle,
  IoIosNotificationsOutline: IoIosNotificationsOutline,
  AiTwotoneBell: AiTwotoneBell,
  FcCollaboration: FcCollaboration,
  AiOutlineTeam: AiOutlineTeam,
  FaPeopleArrows: FaPeopleArrows
}
const IconComponent = ({ name, size = null, className = '' }) => {
  const Icon = icons[name]
  return <Icon size={size} className={className} />
}
export default IconComponent
