const getters = {
  token: state => state.user.token,
  userName: state => state.user.userName,
  userId: state => state.user.userId(),
  userAvater: state => state.user.userAvater()
}
export default getters
