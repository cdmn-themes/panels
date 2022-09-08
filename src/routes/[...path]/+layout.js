import { error } from '@sveltejs/kit'

export function load({url}) {
  return fetch(`API_URL/content?path=${url.pathname}`, {
    headers: {
      'Authorization': `Bearer SITE_ID`,
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(e => {throw error(404, 'Not found')})
}