import { GroupProfileTab, profileTabs, tabs } from '../interfaces'

export const userProfileTabs: profileTabs = {
  heading: 'Settings',
  firstActiveTab: 'profile',
  tabs: [
    {
      name: 'profile',
      label: 'Profile',
      icon: 'FaUser',
      content: {
        header: '',
        name: 'profile',
        id: '',
        image: 'https://gravatar.com/avatar/da94fc38488a72c6d9bb7866659d3177?s=400&d=mp&r=x',
        first_name: '',
        last_name: '',
        last_login: '',
        phone_number: '',
        email: '',
        about: '',
        language: '',
        languages: []
      }
    },
    {
      name: 'team',
      label: 'Team',
      icon: 'FaPeopleArrows',
      content: {
        header: 'Team',
        name: 'team',
        data: [
          {
            heading: '',
            list: [
              {
                name: 'referral_code',
                label: 'Referral Code',
                placeHolder: 'Referral Code',
                value: 'noddi123',
                type: 'text'
              },
              {
                name: 'referredUser',
                label: 'Referred User',
                value: 'stiani123',
                placeHolder: 'Referred User',
                type: 'text'
              },
              {
                name: 'referralUsers',
                label: 'Referral Users',
                value: 3,
                type: 'select',
                options: ['Stain', 'Asif']
              }
            ]
          }
        ]
      }
    },
    {
      name: 'notifications',
      label: 'Notifications',
      icon: 'AiTwotoneBell',
      content: {
        header: 'Notifications',
        name: 'notifications',
        data: [
          {
            heading: 'Email',

            list: [
              {
                name: 'email_booking_info',
                label: 'Booking information',
                checked: false,
                value: 1,
                type: 'checkbox'
              },
              {
                name: 'email_calendar_invites',
                label: 'Calendar invites',
                checked: false,
                value: 2,
                type: 'checkbox'
              },
              {
                name: 'email_newsletter',
                label: 'Newsletter',
                checked: false,
                value: 3,
                type: 'checkbox'
              }
            ]
          },
          {
            heading: 'SMS',

            list: [
              {
                name: 'sms_marketing',
                label: 'Marketing',
                checked: false,
                value: 1,
                type: 'checkbox'
              },
              {
                name: 'sms_service_notification',
                label: 'Service notification',
                checked: false,
                value: 2,
                type: 'checkbox'
              }
            ]
          }
        ]
      }
    },
    {
      name: 'referrals',
      label: 'Referrals',
      icon: 'FaPeopleArrows',
      content: {
        header: 'Referrals',
        name: 'referrals',
        data: [
          {
            heading: '',
            list: [
              {
                name: 'referral_code',
                label: 'Referral Code',
                placeHolder: 'Referral Code',
                value: 'noddi123',
                type: 'text'
              },
              {
                name: 'referredUser',
                label: 'Referred User',
                value: 'stiani123',
                placeHolder: 'Referred User',
                type: 'text'
              },
              {
                name: 'referralUsers',
                label: 'Referral Users',
                value: 3,
                type: 'select',
                options: ['Stain', 'Asif']
              }
            ]
          }
        ]
      }
    },

    {
      name: 'security',
      label: 'Security',
      icon: 'FaLock',
      content: {
        header: 'Security',
        name: 'security',
        data: [
          {
            heading: 'Permissions',

            list: [
              {
                name: 'is_active',
                label: 'Is active',
                checked: false,
                value: 1,
                type: 'checkbox'
              },
              {
                name: 'is_worker',
                label: 'Is worker',
                checked: false,
                value: 2,
                type: 'checkbox'
              },
              {
                name: 'is_manager',
                label: 'Is manager',
                checked: false,
                value: 3,
                type: 'checkbox'
              }
            ]
          },
          {
            heading: '',

            list: [
              {
                name: 'is_staff',
                label: 'Is staff',
                checked: false,
                value: 3,
                type: 'checkbox'
              },
              {
                name: 'is_superuser',
                label: 'Is superuser',
                checked: false,
                value: 3,
                type: 'checkbox'
              }
            ]
          }
        ]
      }
    },
    {
      name: 'apiKeys',
      label: 'API Keys',
      icon: 'FaCode',
      content: {
        header: 'API Keys',
        name: 'apiKeys',
        image: '',
        first_name: '',
        last_name: '',
        email: '',
        description: ''
      }
    },
    {
      name: 'plans',
      label: 'Plans',
      icon: 'SiBlueprint',
      content: {
        header: 'Plans',
        name: 'plans',
        image: '',
        first_name: '',
        last_name: '',
        email: '',
        description: ''
      }
    },
    {
      name: 'subscription',
      label: 'Subscription',
      icon: 'FaRegCreditCard',
      content: {
        header: 'Subscription',
        name: 'subscription',
        image: '',
        first_name: '',
        last_name: '',
        email: '',
        description: ''
      }
    },
    {
      name: 'inovices',
      label: 'Inovices',
      icon: 'AiFillFileAdd',
      content: {
        header: 'Inovices',
        name: 'inovices',
        image: '',
        first_name: '',
        last_name: '',
        email: '',
        description: ''
      }
    }
  ]
}
export const userTabs: tabs[] = [
  { label: 'Profile', name: 'profile', icon: 'FaUser' },
  { label: 'User Groups', name: 'user-groups', icon: 'AiOutlineTeam' },
  { label: 'Notifications', name: 'notifications', icon: 'AiTwotoneBell' },
  { label: 'Referrals', name: 'referrals', icon: 'FaPeopleArrows' },
  { label: 'Security', name: 'security', icon: 'FaLock' }
  // { label: 'API Keys', name: 'apiKeys', icon: 'FaCode', },
  // { label: 'Plans', name: 'plans', icon: 'SiBlueprint', },
  // { label: 'Subscription', name: 'subscription',  icon: 'FaRegCreditCard', },
  // { label: 'Inovices', name: 'inovices', icon: 'AiFillFileAdd' },
]

export const groupProfileTab = {
  tabs: [
    {
      name: 'members',
      label: 'Members',
      icon: 'FaPeopleArrows',
      content: {
        header: 'Members',
        name: 'members',
        data: [
          {
            heading: '',
            list: [
              {
                name: 'referral_code',
                label: 'Referral Code',
                placeHolder: 'Referral Code',
                value: 'noddi123',
                type: 'text'
              },
              {
                name: 'referredUser',
                label: 'Referred User',
                value: 'stiani123',
                placeHolder: 'Referred User',
                type: 'text'
              },
              {
                name: 'referralUsers',
                label: 'Referral Users',
                value: 3,
                type: 'select',
                options: ['Stain', 'Asif']
              }
            ]
          }
        ]
      }
    }
  ]
}

export const userGroupTabs: GroupProfileTab[] = [
  { label: 'Members', name: 'members', icon: 'FaUser' },
  { label: 'Bookings', name: 'bookings', icon: 'FaUser' },
  { label: 'Cars', name: 'cars', icon: 'FaUser' },
  { label: 'Reward Account', name: 'reward-account', icon: 'FaUser' },
  { label: 'Membership Program', name: 'membership-program', icon: 'FaUser' }
]
