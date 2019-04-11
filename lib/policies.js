// ==================================
// User roles
// ==================================

function is (user, role) {
  return user.roleNames.indexOf(role) !== -1
}

function access_admin (user) {
  return is(user, 'admin')
}

// Exports
module.exports = {
  is,
  access_admin,
}
