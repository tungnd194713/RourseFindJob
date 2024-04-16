export default function (context) {
  // If the user is not authenticated
  if (!context.store.getters.isAuthenticated) {
    if (context.from) {
      context.redirect('/login' + '?return_to=' + context.from.fullPath)
    }
    else {
      context.redirect('/login')
    }
  }
}
