//user api
//send {email, password,expoId}
//recive {userData}
exports.userLoginUrl = (password = '', email = '') => `/api/user/login?password=${password}&email=${email}`;

exports.queryUsers = (_id = "", query = '') => `/api/friends/getUserForSerach?_id=${_id}&query=${query}`;

exports.getMyFriendsUrl = (_id) => `/api/friends/getFriends?_id=${_id}`

// send {email,password,firstName,lastName}
//recive {userData}
exports.userRegisterUrl = "/api/user/register";

// send{newPassword,oldPassword,email}
// recive none

exports.userChangePasswrordUrl = "/api/user/changepassword";

// send{email, restCode, newPassword}
// recive none
exports.userChangePasswordWithRestCode = "/api/user/restpasswordrestcode";

//send {shitfs,email}
//recivce shfit
exports.useruploadshfits = "/api/user/uploadshifts";

// send{email}
// recive none
exports.userRequestRestCode = "/api/user/createrestpasswordcode";


// send arry of ids
// recive array of cha_ts
exports.userGetChatsUrl = "/api/chat/getchats";



exports.sendFriendRequestUrl = "/api/friends/sendfriendrequest";

exports.acceptFriendRequestUrl = "/api/friends/friendreqaccept"





// send{audio, email, read={exports.audio=comapny||user},task=true}
// recive none
exports.userUpdateStyleUrl = "api/user/updatestyleuser";



