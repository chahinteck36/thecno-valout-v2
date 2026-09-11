import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';
import { StoreTemplate, StoreOrder, OrderStatus } from '../types';
import { DEFAULT_TEMPLATES } from '../data/defaultTemplates';
import { handleFirestoreError, OperationType } from './firestoreErrors';

const TEMPLATES_COLLECTION = 'templates';
const ORDERS_COLLECTION = 'orders';

/**
 * Fetch all published templates for public Store view (conforming to firestore.rules)
 */
export async function fetchPublishedTemplatesFromDb(): Promise<StoreTemplate[]> {
  try {
    const colRef = collection(db, TEMPLATES_COLLECTION);
    const q = query(colRef, where('status', '==', 'published'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return DEFAULT_TEMPLATES.filter(t => t.status === 'published');
    }

    const templates: StoreTemplate[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as StoreTemplate;
      if (['technoapp-pro-2026', 'techpress-prime-2026', 'apkpulse-gaming-2026', 'aitools-directory-2026', 'cyberguard-software-2026'].includes(data.id)) {
        data.price = 9.99;
      }
      templates.push(data);
    });

    return templates.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } catch (error) {
    console.warn('Firestore fetch published templates note; falling back to local catalog:', error);
    return DEFAULT_TEMPLATES.filter(t => t.status === 'published');
  }
}

/**
 * Fetch all published or accessible templates from Firestore
 * Used by Admin Portal to manage the entire catalog.
 */
export async function fetchTemplatesFromDb(): Promise<StoreTemplate[]> {
  try {
    const colRef = collection(db, TEMPLATES_COLLECTION);
    const snapshot = await getDocs(colRef);
    
    if (snapshot.empty) {
      // Seed default templates into Firestore for future administration
      try {
        for (const tmpl of DEFAULT_TEMPLATES) {
          await setDoc(doc(db, TEMPLATES_COLLECTION, tmpl.id), tmpl);
        }
      } catch (seedErr) {
        console.warn('Initial seeding note (will use memory templates):', seedErr);
      }
      return DEFAULT_TEMPLATES;
    }

    const templates: StoreTemplate[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as StoreTemplate;
      if (['technoapp-pro-2026', 'techpress-prime-2026', 'apkpulse-gaming-2026', 'aitools-directory-2026', 'cyberguard-software-2026'].includes(data.id)) {
        data.price = 9.99;
      }
      templates.push(data);
    });

    // Sort: Featured first, then newest
    return templates.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } catch (error) {
    console.warn('Firestore fetch templates note; falling back to local catalog:', error);
    return DEFAULT_TEMPLATES;
  }
}

/**
 * Save or create a template in Firestore
 */
export async function saveTemplateToDb(template: StoreTemplate): Promise<void> {
  const path = `${TEMPLATES_COLLECTION}/${template.id}`;
  try {
    const docRef = doc(db, TEMPLATES_COLLECTION, template.id);
    await setDoc(docRef, {
      ...template,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Delete a template from Firestore
 */
export async function deleteTemplateFromDb(templateId: string): Promise<void> {
  const path = `${TEMPLATES_COLLECTION}/${templateId}`;
  try {
    const docRef = doc(db, TEMPLATES_COLLECTION, templateId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Submit customer order to Firestore
 */
export async function submitOrderToDb(order: StoreOrder): Promise<void> {
  const path = `${ORDERS_COLLECTION}/${order.orderId}`;
  try {
    const docRef = doc(db, ORDERS_COLLECTION, order.orderId);
    await setDoc(docRef, order);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Fetch all orders for Admin
 */
export async function fetchOrdersFromDb(): Promise<StoreOrder[]> {
  const path = ORDERS_COLLECTION;
  try {
    const colRef = collection(db, ORDERS_COLLECTION);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const orders: StoreOrder[] = [];
    snapshot.forEach((docSnap) => {
      orders.push(docSnap.data() as StoreOrder);
    });
    return orders;
  } catch (error) {
    // If composite index on createdAt is building or not ready, fallback to simple getDocs
    try {
      const colRef = collection(db, ORDERS_COLLECTION);
      const snapshot = await getDocs(colRef);
      const orders: StoreOrder[] = [];
      snapshot.forEach((docSnap) => {
        orders.push(docSnap.data() as StoreOrder);
      });
      return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (fallbackError) {
      handleFirestoreError(fallbackError, OperationType.LIST, path);
    }
  }
}

/**
 * Update order status
 */
export async function updateOrderStatusInDb(orderId: string, status: OrderStatus): Promise<void> {
  const path = `${ORDERS_COLLECTION}/${orderId}`;
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}
