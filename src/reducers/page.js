import { PAGE_SET_HEADER } from '../constants/page'

const initialState = {
  header: { title: 'Calculator tools', lead: 'homepage' },
}

export default function page(state = initialState, { type, payload }) {
  switch (type) {
    case PAGE_SET_HEADER:
      return {
        ...state,
        header: payload,
      }

    default:
      return state
  }
}
