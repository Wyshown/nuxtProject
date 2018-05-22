export default function ({route, redirect, res}) {
  if (route.fullPath.indexOf('usercenter') > 0 || route.fullPath.indexOf('sellercenter') > 0) {
  }
  if (res && res.statusCode === 404) {
    return redirect('/error')
  }
};