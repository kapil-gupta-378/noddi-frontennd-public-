import { profileDto } from '../Dto/profileDto'
import { ApiEndPoints } from '../utils/apiUrls'
import { userProfileTabs } from '../utils/tabsColumns'
import _ from 'lodash'
export const reduceArray = (data, key, columns) => {
  const result = data.reduce((acc, item) => {
    const newItem = {}
    columns.map((col) => {
      newItem[col.name] = item[col.name]
      const value = item[key]
      acc[value] = newItem
    })
    if (item['id']) {
      newItem['id'] = item.id
    }
    return acc
  }, {})
  return result
}

export function getEndpointUrl(endpointName: string, params = {}) {
  
  const endpoint = ApiEndPoints.find((url) => url?.name === endpointName)
  if (!endpoint) {
    return ''
  }
  let url = endpoint.path
  // Replace placeholders in URL with actual values
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value)
  })
  return url
}
export function routeNavigation(navigate, route, params = {}, isReplace = false) {
  if (Object.keys(params).length > 0) {
    navigate(route, { replace: isReplace, state: params })
  } else {
    navigate(route)
  }
}

export function updateTabContent(tabData, content) {
  for (const prop in content) {
    for (const tab of tabData.tabs) {
      if (tab.content.hasOwnProperty(prop)) {
        tab.content[prop] = content[prop]
      } else if (tab.content.hasOwnProperty('data')) {
        for (const data of tab.content.data) {
          if (prop === 'communication_preferences' && Array.isArray(data.list)) {
            if(content[prop]){
              for (const prefProp in content[prop]) {
                const prefListWithProp = data.list.find((item) => item.name === prefProp);
                if (prefListWithProp && prefListWithProp.type === 'checkbox') {
                  prefListWithProp.checked = content[prop][prefProp];
                }
              }
            }else if(tab.content.name === 'notifications'){
              data.list.map((list) => {
                list.checked = false
              })
            }
            
          }
          const listWithProp = data.list && data.list.find((item) => item.name === prop)
          if (listWithProp) {
            if (listWithProp?.type === 'checkbox') {
              listWithProp.checked = content[prop]
            } else {
              listWithProp.value = content[prop]
            }
          }
        }
      }
    }
  }
  return tabData
}

export function getTabContent(tabData, tabName) {
  const tabIndex = tabData.tabs.findIndex((tab) => tab?.name === tabName)
  if (tabIndex > -1) {
    return { tabIndex, content: tabData.tabs[tabIndex].content }
  }
}
export function findCheckedValue(data) {
  const checkedItem = _.find(data.list, { checked: true })
  return checkedItem
}

export function profileStateToServerData(profileState, serverData) {
  
  for (const prop in serverData) {
    for (const tab of profileState.tabs) {
      if (tab.content.hasOwnProperty(prop)) {
        serverData[prop] = tab.content[prop]
      } else if (tab.content.hasOwnProperty('data')) {
        for (const data of tab.content.data) {
          const listWithProp = data.list && data.list.find((item) => item.name === prop)
          if (listWithProp) {
            if (listWithProp?.type === 'checkbox') {
              serverData[prop] = listWithProp.checked
            } else {
              serverData[prop] = listWithProp.value
            }
          }
        }
      }
    }
  }
  return serverData
}
export const emailRegex = () => {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
};
export const phoneRegex = () => {
  return /^\+\d{8,15}$/;
};
export const getInitials = (name = ''): string => name
  .replace(/\s+/, ' ')
  .split(' ')
  .slice(0, 2)
  .map((v) => v && v[0].toUpperCase())
  .join('');

export const customPaginationData = (data, page, perPageSize) => {
  if(data.length > 0){
    return data.slice(perPageSize * (page -1), perPageSize * page)
  }
  return data
}
export const bytesToSize = (bytes: number, decimals = 2): string => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};