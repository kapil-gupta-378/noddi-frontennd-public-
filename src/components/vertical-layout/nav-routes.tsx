import React from 'react'
import { FaGlobeEurope, FaHome, FaUserCircle } from 'react-icons/fa'
import { BiDonateBlood, BiGroup } from 'react-icons/bi'
import { VscFeedback } from 'react-icons/vsc'
import { MdCardMembership, MdOutlineCategory } from 'react-icons/md'
import { RiShoppingBag2Line } from 'react-icons/ri'
import { BsCalendarDate } from 'react-icons/bs'
import { dateToDdMmYyyyDashes } from '../../utils'
import { TbLicense } from 'react-icons/tb'
import { GoOrganization } from 'react-icons/go'
import { AiOutlineNotification } from 'react-icons/ai'
import { RiCoupon2Line } from 'react-icons/ri'
import { FaRoute } from 'react-icons/fa'
import { MdAltRoute } from 'react-icons/md'
import moment from 'moment'

export const NavRoutes = [
  {
    items: [{ path: `/${dateToDdMmYyyyDashes(new Date())}`, title: 'Dashboard', icon: <FaHome size={17} className={'link-icon'} /> }]
  },
  {
    items: [{ path: `/license-areas`, title: 'Delivery areas', icon: <FaGlobeEurope size={17} className={'link-icon'} /> }]
  },
  {
    items: [{ path: `/users`, title: 'Users', icon: <FaUserCircle size={17} className={'link-icon'} /> }]
  },
  {
    items: [{ path: `/user-groups`, title: 'User Groups', icon: <BiGroup size={17} className={'link-icon'} /> }]
  },
  {
    items: [
      {
        title: 'Membership',
        path: '/membership',
        icon: <MdCardMembership size={17} className={'link-icon'} />,
        items: [
          {
            title: 'Programs',
            path: '/membership/programs'
          },
          {
            title: 'Discounts',
            path: '/membership/discounts'
          }
        ]
      }
    ]
  },
  {
    items: [
      {
        title: 'Sales Items',
        path: 'SalesItems/',
        icon: <RiShoppingBag2Line size={17} className={'link-icon'} />,
        items: [          {
            title: 'Bundles',
            path: '/bundle-discounts'
          },
          {
            title: 'Sales Items',
            path: '/sales-items'
          }
        ]
      }
    ]
  },
  {
    items: [{ path: `/service-feedbacks`, title: 'Service Feedbacks', icon: <VscFeedback size={17} className={'link-icon'} /> }]
  },
  {
    items: [{ path: `/calendar-overview`, title: 'Calendar Overview', icon: <BsCalendarDate size={17} className={'link-icon'} /> }]
  },
  {
    items: [{ path: `/service-category`, title: 'Service Categories', icon: <MdOutlineCategory size={17} className={'link-icon'} /> }]
  },
  {
    items: [{ path: `/service-organization`, title: 'Service Organizations', icon: <GoOrganization size={17} className={'link-icon'} /> }]
  },
  {
    items: [{ path: `/license-category`, title: 'License Categories', icon: <TbLicense size={17} className={'link-icon'} /> }]
  },
  {
    items: [{ path: `/service-area-notifications/`, title: 'Service Area Notifications', icon: <AiOutlineNotification size={17} className={'link-icon'} /> }]
  },
  {
    items: [{ path: `/capacity-contribution/`, title: 'Capacity Contribution', icon: <BiDonateBlood size={17} className={'link-icon'} /> }]
  },
  {
    items: [{ path: `/coupons/`, title: 'Coupons', icon: <RiCoupon2Line size={17} className={'link-icon'} /> }]
  },
  {
    items: [
      { path: `/route-planning/?date=${moment(new Date()).add(1, 'days').toISOString().slice(0, 10)}&license-area=`, title: 'Route Planning', icon: <FaRoute size={17} className={'link-icon'} /> }
    ]
  },
  {
    items: [
      {
        path: `/routes-problem/?date=${moment(new Date()).toISOString().slice(0, 10)}&license-area=`,
        title: 'Routes',
        icon: <MdAltRoute size={17} className={'link-icon'} />
      }
    ]
  },
  // {
  //   items: [
  //     {
  //       title: 'Route',
  //       path: '/route',
  //       icon: <MdAltRoute size={17} className={'link-icon'} />,
  //       items: [
  //         {
  //           title: 'Routes Problem',
  //           path: `/route/routes-problem/?date=${moment(new Date()).toISOString().slice(0, 10)}&license-area=`
  //         },
  //         {
  //           title: 'Routes',
  //           path: '/route/routes'
  //         }
  //       ]
  //     }
  //   ]
  // }
]
