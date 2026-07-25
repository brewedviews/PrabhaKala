import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { SEED_PRODUCTS } from '@/lib/products-seed';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'prabha_kala';

let cachedClient = null;
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGO_URL);
    await cachedClient.connect();
  }
  return cachedClient.db(DB_NAME);
}

async function ensureSeed(db) {
  const count = await db.collection('products').countDocuments();
  if (count === 0) {
    const docs = SEED_PRODUCTS.map((p) => ({ id: uuidv4(), createdAt: new Date().toISOString(), ...p }));
    await db.collection('products').insertMany(docs);
  }
}

function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

export async function GET(request, { params }) {
  try {
    const path = params?.path || [];
    const route = path.join('/');
    const db = await getDb();
    await ensureSeed(db);

    if (route === '' || route === 'health') {
      return json({ ok: true, service: 'prabha-kala', ts: Date.now() });
    }

    if (route === 'products') {
      const url = new URL(request.url);
      const featured = url.searchParams.get('featured');
      const category = url.searchParams.get('category');
      const q = url.searchParams.get('q');
      const query = {};
      if (featured === 'true') query.featured = true;
      if (category) query.category = category;
      if (q) query.title = { $regex: q, $options: 'i' };
      const products = await db.collection('products').find(query, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
      return json({ products });
    }

    if (path[0] === 'products' && path[1]) {
      const slug = path[1];
      const product = await db.collection('products').findOne({ slug }, { projection: { _id: 0 } });
      if (!product) return json({ error: 'Not found' }, 404);
      // similar products
      const similar = await db.collection('products').find(
        { slug: { $ne: slug }, $or: [{ category: product.category }, { colour: product.colour }] },
        { projection: { _id: 0 } }
      ).limit(4).toArray();
      return json({ product, similar });
    }

    if (route === 'categories') {
      const cats = await db.collection('products').aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $project: { _id: 0, name: '$_id', count: 1 } },
      ]).toArray();
      return json({ categories: cats });
    }

    return json({ error: 'Route not found' }, 404);
  } catch (e) {
    console.error('API GET error', e);
    return json({ error: e.message }, 500);
  }
}

export async function POST(request, { params }) {
  try {
    const path = params?.path || [];
    const route = path.join('/');
    const db = await getDb();

    if (route === 'cart/validate') {
      const body = await request.json();
      const ids = (body?.items || []).map((i) => i.slug);
      const products = await db.collection('products').find({ slug: { $in: ids } }, { projection: { _id: 0 } }).toArray();
      return json({ products });
    }

    return json({ error: 'Route not found' }, 404);
  } catch (e) {
    console.error('API POST error', e);
    return json({ error: e.message }, 500);
  }
}
