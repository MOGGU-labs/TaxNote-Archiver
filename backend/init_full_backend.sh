#!/bin/bash

PROJECT_NAME="tax-consult-backend"

echo "🚀 Creating production-ready TypeScript Node.js backend with Prisma: $PROJECT_NAME"

# Clean up if exists
rm -rf $PROJECT_NAME

# Create project folder
mkdir $PROJECT_NAME
cd $PROJECT_NAME

# Initialize npm
npm init -y

# Install runtime dependencies
npm install express cors dotenv mysql2

# Install dev dependencies
npm install -D typescript ts-node nodemon @types/node @types/express @types/cors prisma

# Install Prisma client
npm install @prisma/client

# Initialize TypeScript
npx tsc --init

# Create folder structure
mkdir -p src/controllers src/routes src/middleware prisma

# Create basic .env
cat <<EOL > .env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE"
PORT=3000
EOL

# Create tsconfig.json overwrite
cat <<EOL > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
EOL

# Create sample entry point
cat <<EOL > src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

app.listen(PORT, () => {
  console.log(\`✅ Server running at http://localhost:\${PORT}\`);
});
EOL

# Create sample Prisma schema
cat <<EOL > prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Client {
  id_client   Int     @id @default(autoincrement())
  nama_client String
  telp        String?
  alamat      String?
  is_deleted  Boolean @default(false)
  cases       Case[]
}

model Case {
  id_cases    Int     @id @default(autoincrement())
  id_client   Int
  case_name   String
  case_type   String
  is_deleted  Boolean @default(false)
  client      Client  @relation(fields: [id_client], references: [id_client])
  consults    Consult[]
}

model Consult {
  id_consults Int     @id @default(autoincrement())
  id_cases    Int
  hasil       String?
  case        Case    @relation(fields: [id_cases], references: [id_cases])
}
EOL

# Initialize Prisma
npx prisma generate
npx prisma db push

echo "✅ Backend setup complete! Ready to code at: $PROJECT_NAME"
