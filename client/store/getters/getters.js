import state from '../state/state'

export default {
  fullName () {
    return `${state.firstName} ${state.lastName}`
  }
}
