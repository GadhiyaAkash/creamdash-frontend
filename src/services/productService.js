import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const PRODUCTS_COLLECTION = 'products';

// Get all products
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      products
    };
  } catch (error) {
    console.error('Error getting products:', error);
    return {
      success: false,
      error: 'Failed to load products'
    };
  }
};

// Get a single product by ID
export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        success: true,
        product: {
          id: docSnap.id,
          ...docSnap.data()
        }
      };
    } else {
      return {
        success: false,
        error: 'Product not found'
      };
    }
  } catch (error) {
    console.error('Error getting product:', error);
    return {
      success: false,
      error: 'Failed to load product'
    };
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('category', '==', category),
      orderBy('name')
    );
    
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      products
    };
  } catch (error) {
    console.error('Error getting products by category:', error);
    return {
      success: false,
      error: 'Failed to load products'
    };
  }
};

// Get popular products
export const getPopularProducts = async (limitCount = 4) => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('isPopular', '==', true),
      orderBy('rating', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      products
    };
  } catch (error) {
    console.error('Error getting popular products:', error);
    return {
      success: false,
      error: 'Failed to load popular products'
    };
  }
};

// Search products
export const searchProducts = async (searchTerm) => {
  try {
    // Note: This is a simple implementation. For production, you might want to use
    // Algolia or implement full-text search with Cloud Functions
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products = [];
    
    querySnapshot.forEach((doc) => {
      const product = { id: doc.id, ...doc.data() };
      const searchText = searchTerm.toLowerCase();
      
      if (
        product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText)
      ) {
        products.push(product);
      }
    });
    
    return {
      success: true,
      products
    };
  } catch (error) {
    console.error('Error searching products:', error);
    return {
      success: false,
      error: 'Failed to search products'
    };
  }
};

// Listen to products collection changes (real-time updates)
export const subscribeToProducts = (callback) => {
  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('name'));
  
  return onSnapshot(q, (querySnapshot) => {
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(products);
  }, (error) => {
    console.error('Error listening to products:', error);
    callback([]);
  });
};

// Admin functions (for managing products)

// Add a new product (admin only)
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return {
      success: true,
      productId: docRef.id
    };
  } catch (error) {
    console.error('Error adding product:', error);
    return {
      success: false,
      error: 'Failed to add product'
    };
  }
};

// Update a product (admin only)
export const updateProduct = async (productId, productData) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(docRef, {
      ...productData,
      updatedAt: new Date().toISOString()
    });
    
    return {
      success: true
    };
  } catch (error) {
    console.error('Error updating product:', error);
    return {
      success: false,
      error: 'Failed to update product'
    };
  }
};

// Delete a product (admin only)
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
    
    return {
      success: true
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      error: 'Failed to delete product'
    };
  }
};
