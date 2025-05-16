# Sistem Manajemen Parfum

## Database Setup

1. Install MySQL on your system if you haven't already.

2. Create a new MySQL database:
```sql
CREATE DATABASE mydatabase;
```

3. Update the `.env` file with your MySQL credentials:
```env
DATABASE_URL="mysql://username:password@localhost:3306/mydatabase"
```

4. Install dependencies:
```bash
npm install
```

5. Generate Prisma Client:
```bash
npm run db:generate
```

6. Push the database schema:
```bash
npm run db:push
```

7. Initialize the database with sample data:
```bash
npm run db:init
```

8. (Optional) Open Prisma Studio to view and edit data:
```bash
npm run db:studio
```

## Database Schema

The application uses the following models:

- **Product**: Stores perfume product information
  - id, name, description, price, stock, categoryId

- **Category**: Product categories
  - id, name

- **Sale**: Records of product sales
  - id, quantity, total, productId, date

- **Inventory**: Product stock management
  - id, quantity, productId

- **User**: User management
  - id, email, name, password, role

## API Routes

### Products

- `GET /api/products`: Get all products
- `POST /api/products`: Create a new product

Example POST request:
```json
{
  "name": "New Perfume",
  "description": "A fresh fragrance",
  "price": 1000000,
  "stock": 10,
  "categoryId": 1
}
```

## Development

Run the development server:
```bash
npm run dev
```

The application will be available at http://localhost:8000
