import prisma from '../prisma/client';

async function main() {
    // Seed client
    const client = await prisma.clients.upsert({
        where: { id_client: 3 },
        update: {},
        create: {
        id_client: 3,
        client_code: 'CLNT-0002',
        nama_client: '123',
        badan_usaha: 'PT',
        telp: '021-7654321',
        alamat: 'Jl. Merdeka Selatan No. 10',
        npwp: '123',
        nkp: '1001002001',
        keterangan: 'Klien baru potensial',
        },
    });
    console.log('Seeding completed.');
}
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
/*
  // Seed user (case_author) - minimal example
    const user = await prisma.users.upsert({
        where: { id_user: 1 },
        update: {},
        create: {
        id_user: 1,
        username: 'admin',
        password_hash: 'hashed_password_here', // store hashed password here
        full_name: 'Admin User',
        email: 'admin@example.com',
        created_at: new Date(),
        updated_at: new Date(),
        }
        });


    // Seed case
    const caseRecord = await prisma.cases.upsert({
        where: { id_cases: 1 },
        update: {},
        create: {
        id_cases: 1,
        case_uuid: 'bd55d5eb-3f66-11f0-b0d0-00ff57cfc542',
        case_number: 'CASE-0001',
        id_client: client.id_client,
        case_author: user.id_user,
        case_name: 'Sengketa Lahan PT Maju Sejahtera',
        case_type: 'Perdata',
        case_description: 'Klien menggugat pihak ketiga atas sengketa tanah di Jakarta Selatan.',
        created_at: new Date('2025-06-02T04:04:54Z'),
        updated_at: new Date('2025-06-02T04:04:54Z'),
        is_deleted: false,
        deleted_at: null,
        },
    });

  // Seed consult linked to case
    await prisma.consults.upsert({
        where: { id_consults: 1 },
        update: {},
        create: {
        id_consults: 1,
        consult_uuid: 'c1234e67-3f68-11f0-b0d0-00ff57cfc543',
        consult_code: 'CONS-0001',
        id_cases: caseRecord.id_cases,
        tujuan_consult: 'Konsultasi Sengketa Tanah',
        keterangan_consult: 'Diskusi masalah hukum dengan konsultan',
        hasil_consult: 'Solusi mediasi berhasil disepakati',
        konsultan_consult: 'Budi Santoso, SH',
        consult_date: new Date('2025-06-05T10:00:00Z'),
        created_at: new Date(),
        updated_at: new Date(),
        is_deleted: false,
        deleted_at: null,
        },
    });

    console.log('Seeding completed.');
    }

    main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
    */
