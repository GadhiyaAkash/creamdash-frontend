import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Create a Google provider instance
const googleProvider = new GoogleAuthProvider();

// Login with email and password
export const loginWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get additional user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};
    
    return {
      success: true,
      user: {
        id: user.uid,
        email: user.email,
        name: user.displayName || userData.name || 'User',
        role: userData.role || 'customer',
        ...userData
      }
    };
  } catch (error) {
    return {
      success: false,
      error: getAuthErrorMessage(error.code)
    };
  }
};

// Register with email and password
export const registerWithEmailPassword = async (email, password, additionalData = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user's display name
    if (additionalData.name) {
      await updateProfile(user, {
        displayName: additionalData.name
      });
    }
    
    // Save additional user data to Firestore
    const userData = {
      name: additionalData.name || 'User',
      email: user.email,
      role: 'customer',
      createdAt: new Date().toISOString(),
      ...additionalData
    };
    
    await setDoc(doc(db, 'users', user.uid), userData);
    
    return {
      success: true,
      user: {
        id: user.uid,
        email: user.email,
        name: userData.name,
        role: userData.role,
        ...userData
      }
    };
  } catch (error) {
    return {
      success: false,
      error: getAuthErrorMessage(error.code)
    };
  }
};

// Login with Google
export const loginWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    
    // Check if user exists in Firestore, if not create them
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    let userData;
    if (!userDoc.exists()) {
      // Create new user document
      userData = {
        name: user.displayName || 'User',
        email: user.email,
        role: 'customer',
        createdAt: new Date().toISOString(),
        provider: 'google'
      };
      await setDoc(doc(db, 'users', user.uid), userData);
    } else {
      userData = userDoc.data();
    }
    
    return {
      success: true,
      user: {
        id: user.uid,
        email: user.email,
        name: user.displayName || userData.name,
        role: userData.role || 'customer',
        ...userData
      }
    };
  } catch (error) {
    return {
      success: false,
      error: getAuthErrorMessage(error.code)
    };
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to logout. Please try again.'
    };
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent. Check your inbox.'
    };
  } catch (error) {
    return {
      success: false,
      error: getAuthErrorMessage(error.code)
    };
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};
      
      callback({
        id: user.uid,
        email: user.email,
        name: user.displayName || userData.name || 'User',
        role: userData.role || 'customer',
        ...userData
      });
    } else {
      callback(null);
    }
  });
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    default:
      return 'An error occurred. Please try again.';
  }
};
