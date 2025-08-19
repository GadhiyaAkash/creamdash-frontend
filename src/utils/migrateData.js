import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { PRODUCT_LIST } from '../utilities/components/product-list/ProductListConst';

// Migrate products from ProductListConst to Firestore
export const migrateProductsToFirestore = async () => {
  try {
    console.log('Starting product migration...');
    
    // Check if products already exist
    const existingProducts = await getDocs(collection(db, 'products'));
    if (!existingProducts.empty) {
      console.log('Products already exist in Firestore. Skipping migration.');
      return {
        success: true,
        message: 'Products already exist in Firestore'
      };
    }
    
    // Add each product to Firestore
    const productPromises = PRODUCT_LIST.map(async (product) => {
      const productData = {
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // Remove the id since Firestore will generate one
        id: undefined
      };
      
      // Remove undefined id
      delete productData.id;
      
      return await addDoc(collection(db, 'products'), productData);
    });
    
    await Promise.all(productPromises);
    
    console.log(`Successfully migrated ${PRODUCT_LIST.length} products to Firestore`);
    
    return {
      success: true,
      message: `Successfully migrated ${PRODUCT_LIST.length} products`,
      count: PRODUCT_LIST.length
    };
  } catch (error) {
    console.error('Error migrating products:', error);
    return {
      success: false,
      error: 'Failed to migrate products',
      details: error.message
    };
  }
};

// Create sample user data
export const createSampleUsers = async () => {
  try {
    console.log('Creating sample users...');
    
    const sampleUsers = [
      {
        name: 'Admin User',
        email: 'admin@creamdash.com',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        name: 'John Doe',
        email: 'user@creamdash.com',
        role: 'customer',
        createdAt: new Date().toISOString()
      },
      {
        name: 'Demo User',
        email: 'demo@creamdash.com',
        role: 'customer',
        createdAt: new Date().toISOString()
      }
    ];
    
    // Note: In a real app, users are created through authentication
    // This is just for reference/backup data
    const userPromises = sampleUsers.map(async (user) => {
      return await addDoc(collection(db, 'users'), user);
    });
    
    await Promise.all(userPromises);
    
    console.log(`Successfully created ${sampleUsers.length} sample users`);
    
    return {
      success: true,
      message: `Successfully created ${sampleUsers.length} sample users`,
      count: sampleUsers.length
    };
  } catch (error) {
    console.error('Error creating sample users:', error);
    return {
      success: false,
      error: 'Failed to create sample users',
      details: error.message
    };
  }
};

// Run all migrations
export const runAllMigrations = async () => {
  console.log('Starting all migrations...');
  
  const results = {
    products: await migrateProductsToFirestore(),
    users: await createSampleUsers()
  };
  
  console.log('Migration results:', results);
  return results;
};

// Helper function to clear all data (for development/testing)
export const clearAllData = async () => {
  try {
    console.log('⚠️ Clearing all data from Firestore...');
    
    // Clear products
    const productsSnapshot = await getDocs(collection(db, 'products'));
    const productDeletions = productsSnapshot.docs.map(doc => doc.ref.delete());
    
    // Clear users (be careful with this in production!)
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const userDeletions = usersSnapshot.docs.map(doc => doc.ref.delete());
    
    // Clear orders
    const ordersSnapshot = await getDocs(collection(db, 'orders'));
    const orderDeletions = ordersSnapshot.docs.map(doc => doc.ref.delete());
    
    await Promise.all([...productDeletions, ...userDeletions, ...orderDeletions]);
    
    console.log('✅ All data cleared successfully');
    
    return {
      success: true,
      message: 'All data cleared successfully'
    };
  } catch (error) {
    console.error('Error clearing data:', error);
    return {
      success: false,
      error: 'Failed to clear data',
      details: error.message
    };
  }
};
