// import firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from './firebase.config';

// export const initializeLogInFramework = () => {
//     if (firebase.apps.length === 0){
//         firebase.initializeApp(firebaseConfig);
//     }
// }

// export const handleGoogleSignIn =() => {
//     const googleProvider = new firebase.auth.GoogleAuthProvider();
//     return firebase.auth().signInWithPopup(googleProvider)
//     .then( res => {
//       const {displayName, photoURL, email} = res.user;
//       const signedInUser = {
//         isSignedIn:true,
//         name:displayName,
//         email:email,
//         photo:photoURL,
//         success : true
//       }
//       return signedInUser;


//       console.log(displayName, email, photoURL)
//     })
//     .catch (err => {
//       console.log(err);
//       console.log(err.message);
//     })

//   }

//   export const handleFbSignIn = () => {
//     const fbProvider = new firebase.auth.FacebookAuthProvider();
//     return firebase
//   .auth()
//   .signInWithPopup(fbProvider)
//   .then((result) => {
//     const user = result.user;
//     user.success = true;
//     return user;
//   })
//   .catch((error) => {
//     console.log(error.message);
   
//   });
    
//   }

//   export const handleSignOut = () => {
//     return firebase.auth().signOut()
//     .then( res => {
//       const signedOutUser = {
//         isSignedIn: false,
//         newUser : false,
//         photo:'',
//         email:'',
//         password:'',
//         name:'',
//         error:'',
//         success:false
//       }
//       return signedOutUser;

//     })
//     .catch( err => {

//     })
//   }

// export const createUserWithEmailAndPassword = (name, user, password) => {
//    return firebase.auth().createUserWithEmailAndPassword(user.email, password)
//   .then(userCredential => {
//     const newUserInfo = {...user};
//     newUserInfo.error = '';
//     newUserInfo.success=true;
//     // updateUserName(name);
//     return newUserInfo
//     // Signed in 
//     var user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const newUserInfo={};
//     newUserInfo.error=error.message;
//     newUserInfo.success=false;
//     // setUser(newUserInfo);
//     return newUserInfo;
    

 
//     // ..
//   });

// }
// export const signInWithEmailAndPassword = (email, password) => {
//      return firebase.auth().signInWithEmailAndPassword(email, password)
//   .then(userCredential => {
//     const newUserInfo = userCredential.user;
//     newUserInfo.error = '';
//     newUserInfo.success= true;
//     newUserInfo.email = userCredential.user.email;
//     return newUserInfo;
//     console.log('sign in user info', userCredential.user.email);
//     // Signed in
//     var user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const newUserInfo={};
//     newUserInfo.error=error.message;
//     newUserInfo.success=false;
//     return newUserInfo
//   });
// }

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFrameWork = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }
}


export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message)
        })
}


const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        
        // ...
    }).catch(function (error) {
        // Handle error
    });
}


export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            var user = result.user;
            user.success = true;
             
            return user;
        })
        .catch((error) => {
            var errorMessage = error.message;
            var email = error.email;
        });
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                success: false
            }
            return signedOutUser;
        })
        .catch(err => {
            console.log(err)
        })
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}


export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            
            return newUserInfo
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('user name updated successfully')
    }).catch(function (error) {
        console.log(error)
    });
}
